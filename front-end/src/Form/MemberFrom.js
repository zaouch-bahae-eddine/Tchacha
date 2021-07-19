import { useMutation } from '@apollo/client';
import React, { Fragment } from 'react'
import styled from 'styled-components';
import { ADD_MEMBER } from '../Queries/ChannelQuery';

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 5px;
    label{
        color: #32d0ff;
        font-size: 0.9em;
        padding: 3px;
        font-style: italic;
    }
`;

const ModalButton = styled.button`
    width: 100%;
    height: 25px;
    background: #32d0ff;
    border: 0;
    color: white;
    border-radius: 5px;
    margin-top: 7px;
    &:hover{
        cursor: pointer;
        background-color: #1ec4f5;
    }
`;

function MemberForm(props) {
    const [applyChange] = useMutation(ADD_MEMBER, {
        update: () => props.refetch(),
        onCompleted: (data) => { console.log(data) }
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.formInput.memberEmail.replace(/\s/g, '') !== '') {
            applyChange({ variables: { addMemberToChannelEmail: props.formInput.memberEmail, addMemberToChannelChannel: props.formInput.channelId } });
            props.resetForm();
            props.closeMemberModal();
        } else {
            alert('we can\'t add a member without the email');
        }
    }
    return (
        <Fragment>
            <InputGroup>
                <label htmlFor="memberEmail-modal-input">Email du membre</label>
                <input type="text" value={props.formInput.memberEmail} id="memberEmail-modal-input" name="memberEmail"
                    onChange={(e) => props.handleInputChange(e)} />
            </InputGroup>
            <ModalButton onClick={(e) => handleSubmit(e)}>Ajouter</ModalButton>
        </Fragment>
    )
}

export default MemberForm
