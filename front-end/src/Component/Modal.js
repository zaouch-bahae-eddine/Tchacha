import React, { useState, Fragment } from 'react'
import styled from 'styled-components';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import HiddenCover from './HiddenCover';

const ModalStyle = styled.div`
    display: ${props => props.visible ? "block" : "none"};
    position: fixed;
    top: 50% ;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    z-index: 9;
    min-width: ${props => {
        switch (props.size) {
            case 'sm':
                return "300px";
            case 'md':
                return "400px";
            case 'lg':
                return "520px";
            default:
                return "300px";
        }
    }};
`;
const ModalHeader = styled.div`
    display: flex;
    justify-items: center;
    justify-content: space-between;
    padding: 17px;
    font-size: 16pt;
    .CloseModale{
        color: #4452a6;
        vertical-align: bottom;
        &:hover{
            cursor: pointer;
        }
        svg{
            vertical-align: middle;
        }
    }
`;
const ModalContentStyle = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
    padding-top: 0;
`;
function Modal(props) {
    return (
        <Fragment>
            <ModalStyle visible={props.visible}>
                <ModalHeader>
                    <div className="ModalTitle">{props.title ? props.title : "Title of Modal"}</div>
                    <div className="CloseModale" onClick={() => props.closeModal()}><AiOutlineCloseCircle /></div>
                </ModalHeader>
                <ModalContentStyle>
                    {props.children}
                </ModalContentStyle>
            </ModalStyle>
            <HiddenCover visible={props.visible} clickAction={props.closeModal} color="#0100079e" />
        </Fragment>
    )
}

export default Modal
