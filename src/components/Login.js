import React from 'react';
import styled from 'styled-components';
import { auth, provider } from '../firebase';

function Login() {

    const signIn = e => {
        e.preventDefault();
        auth.signInWithPopup(provider).catch((error) => alert(error.message));
    };

  return <LoginContainer>
    <LoginInnerContainer>
        <img src="https://cdn-icons-png.flaticon.com/512/2665/2665038.png" alt=""/>
        <h1>Sign in to the Confab app</h1>
        <p>confab-acc2a.web.app</p>
        <Button onClick={signIn}>
            Sign in with Google
        </Button>
    </LoginInnerContainer>
  </LoginContainer>
}

export default Login;

const LoginContainer = styled.div`
    background-color: black;
        height: 100vh;
        display: grid;
        place-items: center;
`;

const LoginInnerContainer = styled.div`
    padding: 100px;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

> img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }
`;

const Button = styled.div`
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: #0a8d48 !important;
    color: white;
  `;

