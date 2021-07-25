import React, { Fragment, useState } from 'react'
import styled from 'styled-components';
import { useAuth } from '../Auth/AuthProvider';
import { FaEllipsisV } from "react-icons/fa";
import { SettingMenuStyle } from './SettingMenuStyle';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import HiddenCover from './HiddenCover';
import { useMutation } from '@apollo/client';
import { DELETE_MESSAGE } from '../Queries/MessageQuery';
import { Redirect } from 'react-router-dom';
const MessageItemStyle = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    width: 220px;
    margin: 7px 20px;
    border-radius: 12px;
    &.owner{
        background-color: white;
        align-self: flex-start;
        color: #4452a6;
    }
    &.other{
        background-color: #4452a6;
        align-self:flex-end;
        color: white;
    }
    i{
        font-size: 10pt;
        display: block;
        padding-left: 5px;
    }
`;
const AuthorNameStyle = styled.p`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 10pt;
    padding: 5px;
    margin: 0;
    &.other{
        color: white;
    }

`;
const MessageStyle = styled.p`
    &.other{
        color: white;
    }
    &.owner{
        color: #4452a6;
    }
    padding: 7px;
    margin: 0;
`;
function MessageItem(props) {
    const auth = useAuth();
    const [displaySetting, setdisplaySetting] = useState(false);
    const toggelSetting = () => {
        setdisplaySetting(prev => !prev);
    };
    const [deleteMessageMutation] = useMutation(DELETE_MESSAGE, {
        update: () => props.refetch(),

    })
    return (
        <Fragment>        
            <MessageItemStyle className={auth.user.id == props.data.user.id ? "owner" : "other"}>
                <AuthorNameStyle>
                    {props.data.user.name}
                    {auth.user.id == props.data.user.id ?
                        <div onClick={() => toggelSetting()}>
                            <FaEllipsisV />
                            <SettingMenuStyle color="#4452a6" size="110px" visible={displaySetting}>
                                <li onClick={() => props.showModal({
                                    id: props.data.message.id,
                                    message: props.data.message.text
                                })}>
                                    <AiOutlineEdit /> <span>Edit</span></li>
                                <li onClick={() => deleteMessageMutation({
                                    variables: {
                                        rmMessageMsgId: props.data.message.id
                                    }
                                })}>
                                    <AiOutlineDelete /> <span>Delete</span></li>
                            </SettingMenuStyle>
                        </div>
                        : ""}
                </AuthorNameStyle>
                <i>{props.data.user.email}</i>
                <MessageStyle>
                    {props.data.message.text}
                </MessageStyle>
                <HiddenCover visible={displaySetting} clickAction={toggelSetting} />
            </MessageItemStyle>
        </Fragment>
    )
}

export default MessageItem
