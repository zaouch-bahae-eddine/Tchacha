import React, { useState } from 'react'
import styled from 'styled-components'
const MessageInputFormStyle = styled.form`
    display: flex;
    position: sticky;
    bottom: 0;
    background: #eceefd;
    width: 287px;
    justify-content: space-between;
    padding: 10px;
`;
const TextAreaMessageStyle = styled.textarea`
    resize: none;
    width: 220px;
    height: 50px;
    background: #eceefd;
    border-color: #4452a6;
    color: #4452a6;
    bottom: 0;
    background: #eceefd;
    width: 287px;
    justify-content: space-between;
    padding: 10px;
    border-radius: 7px 0 0 7px;
`;
const SendButton = styled.button`
    background: #4452a6;
    border: none;
    color: white;
    border-radius: 0 7px 7px 0;
`;

function MessageInput(props) {
    const [message, setMessage] = useState("");
    const handelInputChange = (e) => {
        const target = e.target;
        setMessage(target.value);
        console.log(target.value);
    }
    const sendMessage = (e) => {
        e.preventDefault();
        props.send(message);
        setMessage("");
        props.refetch(); 
    }
    return (
        <MessageInputFormStyle>
            <TextAreaMessageStyle value={message} name="message" onChange={(e)=> handelInputChange(e)}></TextAreaMessageStyle>
            <SendButton onClick={(e) => sendMessage(e)}>Send</SendButton>
        </MessageInputFormStyle>
    )
}

export default MessageInput
