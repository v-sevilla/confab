import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase"
import Login from "./components/Login";
import Spinner from 'react-spinkit';

const Home = () => (
  <div class="hiddenDiv">
    {/* Content for the home page goes here */}
  </div>
);

function App() {

  const [user, loading] = useAuthState(auth);

  if (loading){
    return (
      <AppLoading>
        <AppLoadingContent>
          <img src="https://cdn-icons-png.flaticon.com/512/2665/2665038.png" alt=""/>
          <Spinner name="line-spin-fade-loader" color="coral"/>
        </AppLoadingContent>
      </AppLoading>
    )
  }

  return (
    <div className="app">
      <Router>
       {!user ? (
        <Login />
       ) : (
        <>
        <Header />
        <AppBody>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Chat />
      </AppBody>
      </>
       )}
      </Router>
    </div>
  );
}

export default App;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContent = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }`;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
  `;