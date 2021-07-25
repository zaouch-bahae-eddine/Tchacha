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
    width: 275px;
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
    width: 170px;
    overflow: hidden;
    color: #4452a6;
    i{
        font-size: 9pt;
    }
    p{
        margin: 0;
        padding: 2px 17px;
        font-size: 11pt;
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
    const deleteMember = async (email, channel) => {
        await deleteMemberMutaion({variables:{rmMemberFromChannelEmail: email, rmMemberFromChannelChannel: channel}});
        props.refetch();
    }
    return (
        <Fragment>
            <MemberItemStyle>
                <div>
                    <FirstLetterDesign word={props.data.name} />
                    <MemberDataStyle>
                        <p>{props.data.name}</p>
                        <p><i>{props.data.email}</i></p>
                    </MemberDataStyle>
                </div>
                {
                    (props.owner || props.data.id == auth.user.id) ? 
                    <DeleteMemberStyle onClick={() => deleteMember(props.data.email, props.channelId)}><AiOutlineUserDelete/></DeleteMemberStyle>
                    : <DeleteMemberStyle><RiAdminLine/></DeleteMemberStyle>
                }
                
            </MemberItemStyle>
            <LigneSeparatorStyle/>
        </Fragment>
    )
}

export default MemberItem
