import React from 'react';
import styled from 'styled-components';
import { AiOutlineAppstoreAdd, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

const TaskContainerStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 320px;
    background-color: #eceefd;
    border-radius: 10px;
    margin: 17px auto;

`;
const TasksGroupeHeaderStyle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;

    background-color: #eceefd;
    svg {
        color: #4452a6;
        font-size: 16pt;
        &:hover{
            cursor: pointer;
        }
    }
    div{
        position: relative;
    }
`;

const AddTaskStyle = styled.div`
    display: flex;
    align-items: center;
    width: 90%;
    max-width: 280px;
    height: 50px;
    margin-bottom: 17px;
    background-color: #d9defa;
    border-radius: 10px;
    color: #4452a6;
    svg{
        margin: 0 12px;
        font-size: 16pt;
    }
    &:hover{
        cursor: pointer;
    }
`;
const ContentStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 320px;
    border-radius: 10px;
    margin: 17px auto;
`;
function MessageContainer(props) {
    return (
        <TaskContainerStyle>
            <TasksGroupeHeaderStyle>
                {
                    props.homeBackLink ?
                        <Link to="/" > <IoMdArrowRoundBack /></Link>
                        : ""
                }
                <h2>Channel {props.columnTitle}</h2>
                <div onClick={() => props.dispalayMemberModal()}>
                    <AiOutlineUsergroupAdd />
                </div>
            </TasksGroupeHeaderStyle>
            <p>Messages</p>
            <ContentStyle>
            {props.children}
            </ContentStyle>
        </TaskContainerStyle>
    )
}

export default MessageContainer
