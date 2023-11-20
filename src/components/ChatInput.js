import React, { useState } from 'react'
import styled from 'styled-components';
import { auth, db } from "../firebase";
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import SendIcon from '@mui/icons-material/Send';

function ChatInput({channelName, channelId, chatRef}) {

    const [input, setInput] = useState("");
    const [user] = useAuthState(auth);

    console.log(chatRef, 'ChatInput')

    const sendMessage = (e) => {
       e.preventDefault(); //Prevents refresh

        if (!channelId) {
            return false;
        }

        const trimmedInput = input.trim();

        if (trimmedInput === '') {
          console.error('Invalid input: Cannot send a message.');
          return false;
        }

        db.collection('rooms').doc(channelId).collection('messages').add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user.displayName,
            userImage: user.photoURL,
        });
        
        setInput("");
    };

    const isInputValid = input.trim() !== '';
    const buttonStyle = isInputValid ? { backgroundColor: 'royalblue' } : {};


  return (
  <ChatInputContainer>
    <form>
      <input 
        value={input} 
        onChange= {(e) => setInput(e.target.value)}
        placeholder={`Message #${channelName}`}
      />
      <Button type='submit' onClick={sendMessage} style={buttonStyle}>
          <SendIcon />
      </Button>
    </form>
  </ChatInputContainer>
  );
}

export default ChatInput

const ChatInputContainer = styled.div`
  padding: 25px;
  position: sticky;
  bottom: 0;
  border-radius: 20px;
  background-color: white;

  > form {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 15px ;
    background-color: white;
    gap: 10px;
  }

  > form > input {
    flex: 1;
    border: none;
    outline: none;
  }

  > form > button {
    color: white;
    cursor: pointer;
    border: 0.1px solid gray;
    background-color: ${(props) => (props.isValid ? 'blue' : 'gray')};
    &:hover {
      background-color: ${(props) => (props.isValid ? 'blue' : 'gray')};
    }
  }
`;

const Button = styled.button`
`;
