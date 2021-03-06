import styled from 'styled-components';

export const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 520px;
    margin: 0 auto;
    padding: 22px;
    width: 276px;
    background: #eceefd;
    border-radius: 10px;
    div{
        display: flex;
        flex-direction: column;
        width: 210px;
        padding: 5px;
        label{
            margin: 5px;
            color: #4452a6;
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
        color: #4452a6;
        cursor: pointer;
        transition: .3ms;
        
        border-radius: 7px;
        &:hover{
            background-color: #4452a6;
            color: white;
            transition: .3ms;
        }
    }
    
`;