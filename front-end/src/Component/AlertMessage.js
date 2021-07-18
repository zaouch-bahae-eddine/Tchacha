import React from 'react'
import styled from 'styled-components';

const AlertMessageStype = styled.p`
    width: 100%;
    background-color: red;
    color: white;
    text-align: center;
`;
function AlertMessage(props) {
    return (
        <AlertMessageStype>
            {props.message}
        </AlertMessageStype>
    )
}

export default AlertMessage
