import React from 'react'
import styled from 'styled-components';

const AlertMessageStype = styled.p`
    width: 100%;
    background-color: #ff000091;
    color: white;
    text-align: center;
    padding: 22px;
`;
function AlertMessage(props) {
    return (
        <AlertMessageStype>
            {props.message}
        </AlertMessageStype>
    )
}

export default AlertMessage
