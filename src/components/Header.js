import React from 'react';
import styled from "styled-components";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Header() {
    const [user] = useAuthState(auth);

        return (
            <div>
                <HeaderContainer>
           
                    <HeaderLeft>
                        <HeaderAvatar 
                        onClick={() => auth.signOut()} 
                        alt={user?.displayName} 
                        src={user?.photoURL}/>
                        <AccessTimeIcon />
                    </HeaderLeft>
              
                        <HeaderSearch>
                            <SearchIcon />
                            <input placeholder="Search" />
                        </HeaderSearch>

                        <HeaderRight>
                            <HelpOutlineIcon />
                        </HeaderRight>
                </HeaderContainer>
            </div>
        );
}

export default Header;

const HeaderSearch = styled.div`
    flex: 0.4;
    opacity: 1;
    border-radius: 6px;
    background-color: #c0d1e7;
    text-align: center;
    display: flex;
    padding: 0 50px;
    color: #28457a;
    border: 1px #28457a;

    > input {
        background-color: transparent;
        border: none;
        text-align: center;
        min-width: 30vw;
        outline: 0;
        color: black;
    }
`

const HeaderContainer = styled.div`
    display: flex;
    position: fixed;
    width: 100%;
    align-items: center;
    padding: 10px 0;
    background-color: var(--confab-color);
    color: white;
`;

const HeaderLeft = styled.div`
    flex: 0.3;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin:0 10px;
`;

const HeaderRight = styled.div`
    flex: 0.3;
    display: flex;
    align-items: flex-end;

    >.MuiSvgIcon-root{
        margin-left: auto;
        margin-right: 20px;
    }
`

const HeaderAvatar = styled.img`
    cursor: pointer;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    object-fit: cover;
     :hover {
        opacity: 0.8;
     }`;

export { HeaderAvatar };