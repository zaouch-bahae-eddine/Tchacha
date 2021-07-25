import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import HiddenCover from '../HiddenCover';

const AlertStyle = styled.div`
    width: 270px;
    box-sizing: border-box;
    position: fixed;
    top: 50% ;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9;
    background-color: white;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    padding: 17px;
`;

const Split = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;
const AlertIcon = styled.div`
    box-sizing: border-box;
    width: 60px;
    padding: 0 15px 0 0;
    img{
        width: 100%;
    }
`;
const AlertMessage = styled.div`
    color: #FF000091;
`;

const ButtonAlertContainer = styled.div`
    margin-top: 17px;
    display: flex;
    justify-content: center;
`;
const ButtonAlert = styled(Link)`
    text-decoration: none;
    display: block;
    max-width: 200px;
    background-color: #FF000091;
    padding: 7px 13px;
    border-radius: 10px;
    color: white;
`;
function PopupAlert(props) {
    return (
        <>
        <AlertStyle>
            <Split>
                <AlertIcon>
                    <img src={props.icon} />
                </AlertIcon>
                <AlertMessage>
                    {props.msg}
                </AlertMessage>
            </Split>
            {
                props.redirectTo ?
                    <ButtonAlertContainer>
                        <ButtonAlert to={props.redirectTo}>{props.buttonLabel}</ButtonAlert>
                    </ButtonAlertContainer>
                    : ""
            }
        </AlertStyle>
            <HiddenCover visible={true} color="#6b6b6b7a" clickAction={()=>{return;}} />
        </>
    )
}

export default PopupAlert
