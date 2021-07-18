import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../Auth/AuthProvider'
import AlertMessage from '../Component/AlertMessage';
const FormRegister = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 520px;
    margin: 0 auto;
    padding: 22px;
    input, button{
        width: 50%;
        padding: 5px;
        margin: 5px;
    }
    
`;
function Register() {
    const auth = useAuth();
    const [credential, setCredential] = useState({
        userName: "",
        email: "",
        password: "",
        passwordCheck: ""
    });
    const [alertMessage, setAlertMessage] = useState({
        display: false,
        msg: ""
    });
    const inputChangeHandler = (e) => {
        const target = e.target;
        const newCredential = { ...credential };
        newCredential[target.name] = target.value;
        setCredential(newCredential);
    }
    const RegisterHandler = async (e) => {
        e.preventDefault();
        if(credential.password != credential.passwordCheck){
            setAlertMessage({
                display: true,
                msg: "Mot de passe Incorrecte"
            })
            return;
        }
        if (auth.user == null) {
            const result = await auth.register(credential);
            if (result.status > 400) {
                setAlertMessage({
                    display: true,
                    msg: result.msg
                });
            }
        }
    }
    return (
        <div>
            {
                auth.user != null ? <Redirect to="/" /> : ""
            }
            <titleRegister>Register</titleRegister>
            <FormRegister>
                {
                    alertMessage.display? <AlertMessage message={alertMessage.msg} /> : ""
                }
                <label htmlFor="user-name"> User Name</label>
                <input type="text" id="user-name" name="userName" onChange={e => inputChangeHandler(e)} />
                <label htmlFor="email">email </label>
                <input type="text" id="email" name="email" onChange={e => inputChangeHandler(e)} />
                <label htmlFor="password">Password </label>
                <input type="password" id="password" name="password" onChange={e => inputChangeHandler(e)} />
                <label htmlFor="password-check">Retype password for check</label>
                <input type="password" id="password-check" name="passwordCheck" onChange={e => inputChangeHandler(e)} />
                <button onClick={e => RegisterHandler(e)}>Sign Up</button>
            </FormRegister>
        </div>
    )
}

export default Register
