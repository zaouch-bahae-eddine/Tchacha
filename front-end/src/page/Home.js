import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider';
const TaskContainerStyle = styled.div`
    align-items: center;
    width: 320px;
    background-color: #eceefd;
    border-radius: 10px;
    margin: 17px auto;
`;
const HomeTitle = styled.h1`
    color: #4452a6;
    text-align: center;
    padding: 22px;
`;
const SignLink = styled(Link)`
    text-decoration: none;
    color: #4452a6;
    & > div {
        font-size: 16pt;
        text-align: center;
        padding: 17px 0;
        width: 322px;
    }
`;


function Home() {
    const auth = useAuth();
    return (
        <Fragment>
            {
                auth.user == null ?
                    <Fragment>
                        <TaskContainerStyle>
                            <HomeTitle>
                                Tcha-Tcher
                            </HomeTitle>
                        </TaskContainerStyle>
                        <SignLink to="/signin">
                            <TaskContainerStyle>Sign in </TaskContainerStyle>
                        </SignLink>
                        
                        <SignLink to="/register">
                            <TaskContainerStyle>Sign up </TaskContainerStyle>
                        </SignLink>
                    </Fragment>
                    : <Redirect to="/channel" />
            }
        </Fragment>
    )
}

export default Home
