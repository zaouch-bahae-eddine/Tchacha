import { useMutation } from '@apollo/client';
import React, { Fragment } from 'react'
import { AiOutlineUserDelete } from 'react-icons/ai';
import { RiAdminLine } from 'react-icons/ri';
import styled from 'styled-components'
import { useAuth } from '../Auth/AuthProvider';
import { DELETE_MEMBER } from '../Queries/ChannelQuery';
import FirstLetterDesign from './FirstLetterDesign'

const MemberItemStyle = styled.div`
    display: flex;
    width: 305px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
    & > div{
        padding: 10px;
    display: flex;
    align-items: center;
    }
    &:hover{
        background-color: #4452ae1f;
        border-radius: 5px;
    }
`;
const MemberDataStyle = styled.div`
    p{
        margin: 0;
        padding: 2px 17px;
        font-size: 11pt;
    }
    p:firstChild{
        font-weight: bolder;
    }
`;
const LigneSeparatorStyle = styled.div`
    width: 240px;
    height: 1px;
    background-color: white;
`;

const DeleteMemberStyle = styled.div`
    color: #4452a6;
    font-size: 14pt;
    &:hover{
        cursor: pointer;
    }
`;
function MemberItem(props) {
    const [deleteMemberMutaion] = useMutation(DELETE_MEMBER);
    const auth = useAuth()
    const deleteMember = (email, channel) => {
        deleteMemberMutaion({variables:{rmMemberFromChannelEmail: email, rmMemberFromChannelChannel: channel}});
        props.refetch();
    }
    return (
        <Fragment>
            <MemberItemStyle>
                <div>
                    <FirstLetterDesign word={props.data.name} />
                    <MemberDataStyle>
                        <p>{props.data.name}</p>
                        <p>{props.data.email}</p>
                    </MemberDataStyle>
                </div>
                {
                    auth.user.id != props.data.id ? 
                    <DeleteMemberStyle onClick={() => deleteMember(props.data.email, props.channelId)}><AiOutlineUserDelete/></DeleteMemberStyle>
                    : <DeleteMemberStyle><RiAdminLine/></DeleteMemberStyle>
                }
                
            </MemberItemStyle>
            <LigneSeparatorStyle/>
        </Fragment>
    )
}

export default MemberItem
