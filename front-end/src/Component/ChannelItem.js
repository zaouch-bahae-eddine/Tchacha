import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineSetting } from 'react-icons/ai';
import { BiGroup } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { DELETE_CHANNEL } from '../Queries/ChannelQuery';
import HiddenCover from './HiddenCover';
import { SettingMenuStyle } from './SettingMenuStyle';
const ChannelItemStyle = styled.div`
    width: 280px;
    border-radius: 10px;
    background-color: white;
    margin-bottom: 11px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    & > div{
        padding: 12px;
        & > span{
            font-size: 0.7em;
            color: white;
            background: #ff32325e;
            padding: 3px;
            border-radius: 3px;
        }
        & > p {
            padding: 5px;
        }
    }
    h2{
        margin-bottom: 0;
    }

`;
const MembersLink = styled(Link)`
    text-decoration: inherit;
    color: inherit;
    display: inherit;
    justify-content: inherit;
    align-items: inherit;
`;
const ChannelHeader = styled.div`
    display: flex;
    padding: 0 !important;
    justify-content: space-between;
    align-items: center;
    svg{
        font-size: 16pt;
        color: #32d0ff;
        &:hover{
            cursor: pointer;
        }
    }
    & > div {
        position: relative;
    }
`;
const ChannelNameStyle = styled.div`
    font-size: 13pt;
    color: #4452a6;
    width: 90%;
`;
const ToMessagesStyle = styled(Link)`
    display: block;
    position: absolute;
    width: 230px;
    height: 51px;
    z-index: 8;
`;
function ChannelItem(props) {
    const [displaySetting, setDisplaySetting] = useState(false);
    const toggelSetting = () => {
        setDisplaySetting((prev) => !prev);
    }
    const [deleteChannelMutation, { data }] = useMutation(DELETE_CHANNEL, {
        update: () => props.refetch(),
        onCompleted: (data) => { console.log(data) }
    })
    const deleteChannel = (id) => {
        deleteChannelMutation({ variables: { deleteChannelId: id } });
    }
    return (
        <ChannelItemStyle>
            <div>
                <ChannelHeader>
                    <ToMessagesStyle to={"/messages/" + props.data.id}></ToMessagesStyle>
                        <ChannelNameStyle>{props.data.name}</ChannelNameStyle>
                    <div onClick={() => toggelSetting()}>
                        <AiOutlineSetting />
                        <SettingMenuStyle color="#32d0ff" size="110px" visible={displaySetting}>
                            <li onClick={() => props.dispalayChannelModal(props.data)}><AiOutlineEdit /> <span>Edit</span></li>
                            <MembersLink to={"/members/" + props.data.id}><li onClick={() => props.dispalayChannelModal(props.data)}><BiGroup /> <span>Membres</span></li></MembersLink>
                            <li onClick={() => deleteChannel(props.data.id)}><AiOutlineDelete /> <span>Delete</span></li>
                        </SettingMenuStyle>
                    </div>
                </ChannelHeader>
            </div>
            <HiddenCover visible={displaySetting} clickAction={toggelSetting} />
        </ChannelItemStyle>
    )
}

export default ChannelItem
