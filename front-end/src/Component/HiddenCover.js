import React from 'react'
import styled from 'styled-components';

const HiddenCoverStyle = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 8;
    background-color: ${props => props.color? props.color : "#fff0"};
    display: ${props=> props.visible? "block" : "none"};
`;
function HiddenCover(props) {
    return (<HiddenCoverStyle visible={props.visible} onClick={()=>props.clickAction()} color={props.color} />)
}

export default HiddenCover