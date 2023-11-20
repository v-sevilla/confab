import React, { useEffect, useRef} from 'react';
import styled from "styled-components";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InfoIcon from '@mui/icons-material/Info';
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice";
import ChatInput from "./ChatInput";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from './Message';

function Chat() {

    const roomId = useSelector(selectRoomId);
    const [roomDetails] = useDocument(
        roomId && db.collection('rooms').doc(roomId)
    )
    const [roomMessages, loading] = useCollection(
        roomId &&
        db
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy("timestamp","asc")
    );
    
    const lastMessageRef = useRef(null);

    useEffect(() => {
        console.log(lastMessageRef)
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [roomMessages]);

    useEffect(() => {
        lastMessageRef?.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [roomId, loading])

  return (
    <ChatContainer>

        {!roomId && (
                <NoChannelSelectedMessage>
                    <p>Features of this app include: full user authentication, styled components and firebase hooks.</p>
                    <p>As a user, you can add new channels and send real-time messages.</p>
                    <span>Select a channel to start chatting!</span>
                </NoChannelSelectedMessage>
        )}

        {roomDetails && roomMessages && (
            <>
                <Header>
                    <HeaderLeft>
                        <h4><strong>#{roomDetails?.data().name}</strong></h4>
                        <StarBorderIcon />
                    </HeaderLeft>

                    <HeaderRight>
                        <p>
                            <InfoIcon /> Details
                        </p>
                    </HeaderRight>


                </Header>

                <ChatMessages>
                    {roomMessages?.docs.map((doc, i) => {
                        const { message, timestamp, user, userImage } = doc.data();

                        return (
                            <Message
                                key={doc.id}
                                ref={i === roomMessages.docs.length - 1 ? lastMessageRef : null}
                                message={message}
                                timestamp={timestamp}
                                user={user}
                                userImage={userImage}
                            />
                        );
                    })}
                </ChatMessages>

                <ChatInput
                    channelName={roomDetails?.data().name} 
                    channelId={roomId}
                />
            </>
        )}
    </ChatContainer>
  )
}

export default Chat;

const ChatMessages = styled.div`
    flex: 1;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    padding-top: 30px;
    border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;

    > h4 {
        display: flex;
        text-transform: lowercase;
        margin-right: 10px;
    }
    > h4 > .MuiSvgIcon-root {
        margin-left: 20px;
        font-size: 18px;
    }
`;

const HeaderRight = styled.div`
    > p {
      display: flex;
      align-items: center;
      font-size: 14px;
    }
`;

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 30px;
    `;

const NoChannelSelectedMessage = styled.p`
    text-align: center;
    margin-top: 75px;
    color: #28457a;
`;