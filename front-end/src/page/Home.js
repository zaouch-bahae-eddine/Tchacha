import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider';
import Tchatchat from './Tchatchat';
import Channel from './Channel';
const HomeTitle = styled.h1`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: purple;
    color: white;
    text-align: center;
`;
const SigninLink = styled(Link)`

`;
const SignupLink = styled(Link)`

`;
const NavigationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    top: -40vh;
`;
function Home() {
    const auth = useAuth();
    return (
        <Fragment>
            {
                auth.user == null?
                        <Fragment>
                            <HomeTitle>
                                Tcha-Tcher
                            </HomeTitle>
                            <NavigationContainer>
                                <SigninLink to="/signin">Sign in</SigninLink>
                                <SignupLink to="/register">Sign up</SignupLink>
                            </NavigationContainer>
                        </Fragment> 
                : <Channel />
            }
        </Fragment>
    )
}

export default Home
