import { useMutation } from '@apollo/client';
import React, { Fragment } from 'react'
import styled from 'styled-components';
import { SET_MESSAGE } from '../Queries/MessageQuery';

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
function MessageForm(props) {
    const [applyChange] = useMutation(SET_MESSAGE, {
        ignoreResults: false,
        update: () => props.refetch(),
        onCompleted: (data) => {console.log(data)},
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.formInput.message.replace(/\s/g, '') !== '') {
            applyChange({variables: {
                setMessageMsgId: props.formInput.id,
                setMessageText: props.formInput.message
            }});
            props.close();
        }
    };
    return (
        <Fragment>
            <InputGroup>
                <label htmlFor="message-modal-input">Nom du channel</label>
                <input type="text" value={props.formInput.message} id="message-modal-input" name="message"
                    onChange={(e) => props.handleInputChange(e)} />
            </InputGroup>
            <ModalButton onClick={(e) => handleSubmit(e)}>Modifier</ModalButton>
        </Fragment>
    )
}

export default MessageForm
