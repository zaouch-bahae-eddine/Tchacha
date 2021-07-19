import React from 'react'
import styled from 'styled-components';

const CircleStyle = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #4452a6;
    font-size: 16pt;
    font-weight: bolder;
`;
function FirstLetterDesign(props) {
    const firstLetter = props.word.charAt(0).toUpperCase();
    return (
        <CircleStyle>
            {firstLetter}
        </CircleStyle>
    )
}

export default FirstLetterDesign
