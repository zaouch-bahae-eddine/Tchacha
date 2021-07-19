import { useMutation } from '@apollo/client';
import React, { Fragment } from 'react'
import styled from 'styled-components';
import { ADD_CHANNEL, SET_CHANNEL } from '../Queries/ChannelQuery';

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
function ChannelForm(props) {
    const [applyChange] = useMutation(props.type === "add" ? ADD_CHANNEL : SET_CHANNEL, {
        ignoreResults: false,
        update: () => props.refetch(),
        onCompleted: (data) => {console.log(data)}
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.formInput.channelName.replace(/\s/g, '') !== '') {
            if(props.type === "add"){
                applyChange({ variables: { createChannelName: props.formInput.channelName } });
            } else {
                applyChange({ variables: { setChannelNameId: props.formInput.id, setChannelNameName: props.formInput.channelName } });
                props.closeChannelModal();
            }
            props.resetForm();

        } else {
            alert('we can\'t add or set channel without the name');
        }
    }
    return (
        <Fragment>
            <InputGroup>
                <label htmlFor="channelName-modal-input">Nom du channel</label>
                <input type="text" value={props.formInput.channelName} id="channelName-modal-input" name="channelName"
                    onChange={(e) => props.handleInputChange(e)} />
            </InputGroup>
            <ModalButton onClick={(e) => handleSubmit(e)}>{props.type === "add" ? "Ajouter" : "Modifier"}</ModalButton>
        </Fragment>
    )
}

export default ChannelForm
