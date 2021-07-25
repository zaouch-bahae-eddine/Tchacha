import React, { Fragment, useState } from 'react'
import { Redirect } from 'react-router-dom';
import styled from 'styled-components'
import { useAuth } from '../Auth/AuthProvider';
import AlertMessage from '../Component/AlertMessage';
import { FormStyle } from '../Component/FormStyle';
import { TitleStyle } from '../Component/TitleStyle';

function SignIn() {
    const [credential, setCredential] = useState({
        email: "",
        password: ""
    });
    const [alertMessage, setAlertMessage] = useState({
        display: false,
        msg: ""
    });
    const auth = useAuth();
    const loginHandler = async (e) => {
        e.preventDefault();
        if (auth.user == null) {
            try{
                const result = await auth.login(credential.email, credential.password);
                if (result.status > 400) {
                    const msg = {
                        display: true,
                        msg: result.msg
                    }
                    setAlertMessage(msg);
                }
            } catch(e){
                return (JSON.stringify(e));
                if(e.message == "Failed to fetch"){
                    alert('fitch');
                }
            }

        }
    }
    const inputChangeHandler = (e) => {
        const target = e.target;
        const newCredential = { ...credential };
        newCredential[target.name] = target.value;
        setCredential(newCredential);
    }
    return (
        <div>
            <TitleStyle>Sign in</TitleStyle>
            <FormStyle>
                {
                    auth.user != null ? <Redirect to="/channel" /> : ""
                }
                {
                    alertMessage.display ? <AlertMessage message={alertMessage.msg} /> : ""
                }
                <div>
                    <label htmlFor="email">Email </label>
                    <input id="email" name="email" value={credential.email} onChange={(e) => inputChangeHandler(e)} />
                </div>
                <div>
                    <label htmlFor="password">Password </label>
                    <input type="password" id="password" name="password" value={credential.password} onChange={(e) => inputChangeHandler(e)} />
                </div>
                <button onClick={e => loginHandler(e)}>Login</button>
            </FormStyle>
        </div>
    )
}

export default SignIn
