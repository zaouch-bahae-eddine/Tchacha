import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider'
import AlertMessage from '../Component/AlertMessage';
import { FormStyle } from '../Component/FormStyle';
import { TitleStyle } from '../Component/TitleStyle';

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
        if (credential.userName.trim() == "" ||
            credential.password.trim() == "" ||
            credential.email.trim() == "" ||
            credential.passwordCheck.trim() == "") {
            setAlertMessage({
                display: true,
                msg: "Informations Manquantes"
            })
            return;
        } else if (credential.password != credential.passwordCheck) {
            setAlertMessage({
                display: true,
                msg: "Mot de passe Incorrecte"
            })
            return;
        }
        if (auth.user == null) {
            const result = await auth.register(credential);
            if (result.status >= 400) {
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
            <TitleStyle>Register</TitleStyle>
            <FormStyle>
                {
                    alertMessage.display ? <AlertMessage message={alertMessage.msg} /> : ""
                }
                <div>
                    <label htmlFor="user-name"> User Name</label>
                    <input type="text" id="user-name" name="userName" onChange={e => inputChangeHandler(e)} />
                </div>
                <div>
                    <label htmlFor="email">Email </label>
                    <input type="text" id="email" name="email" onChange={e => inputChangeHandler(e)} />
                </div>
                <div>
                    <label htmlFor="password">Password </label>
                    <input type="password" id="password" name="password" onChange={e => inputChangeHandler(e)} />
                </div>
                <div>
                    <label htmlFor="password-check">Retype the password for check</label>
                    <input type="password" id="password-check" name="passwordCheck" onChange={e => inputChangeHandler(e)} />
                </div>
                <button onClick={e => RegisterHandler(e)}>Sign Up</button>
            </FormStyle>
        </div>
    )
}

export default Register
