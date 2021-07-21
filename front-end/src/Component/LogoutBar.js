import React, { Fragment } from 'react'
import styled from 'styled-components';
import { useAuth } from '../Auth/AuthProvider';

const TaskContainerStyle = styled.div`

    align-items: center;
    width: 320px;
    background-color: #eceefd;
    border-radius: 10px;
    margin: 17px auto;
    & > div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
    }

`;
const UserNameStyle = styled.div`
    font-size: 16pt;
    color: #4452a6;
`;
const LogoutButtonn = styled.button`
    background-color: #ff000091;
    border: none;
    width: 90px;
    height: 40px;
    border-radius: 7px;
    color: white;
    cursor: pointer;
`;
function LogoutBar() {
    const auth = useAuth();
    return (
        <Fragment>
            {
                auth.user != null? 
                <TaskContainerStyle>
                    <div>
                        <UserNameStyle>
                            {auth.user.name}
                        </UserNameStyle>
                        <LogoutButtonn onClick={() => auth.logout()}>Déconnecter</LogoutButtonn>
                    </div>
                </TaskContainerStyle>
                : ""
            }
        </Fragment>
    )
}

export default LogoutBar
