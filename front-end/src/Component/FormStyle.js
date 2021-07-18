import styled from 'styled-components';

export const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 520px;
    margin: 0 auto;
    padding: 22px;
    width: 220px;
    background: #d3d3d352;
    border-bottom: 5px #0000ff73 solid;
    div{
        display: flex;
        flex-direction: column;
        width: 210px;
        padding: 5px;
        label{
            margin: 5px;
            color: #0000ff73;
        }
    }
    input {
        padding: 5px;
        border: 1px lightgray solid;
    }
    button{
        padding: 5px;
        margin-top: 14px;
        width: 210px;
        border: 1px lightgray solid;
        background-color: white;
        color: #0000ff73;
        cursor: pointer;
        transition: .3ms;
        &:hover{
            background-color: #0000ff73;
            color: white;
            transition: .3ms;
        }
    }
    
`;