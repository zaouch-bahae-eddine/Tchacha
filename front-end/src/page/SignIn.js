import React, { Fragment, useState } from 'react'
import { Redirect } from 'react-router-dom';
import styled from 'styled-components'
import { useAuth } from '../Auth/AuthProvider';
import AlertMessage from '../Component/AlertMessage';

const StyledForm = styled.form``;
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
            console.log(credential);
            const result = await auth.login(credential.email, credential.password);
            if (result.status > 400) {
                const msg = {
                    display: true,
                    msg: result.msg
                }
                setAlertMessage(msg);
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
            SignIn page
            <StyledForm>
                {
                    auth.user != null ? <Redirect to="/" /> : ""
                }
                {
                    alertMessage.display ? <AlertMessage message={alertMessage.msg} /> : ""
                }
                <label htmlFor="email">Email </label>
                <input id="email" name="email" value={credential.email} onChange={(e) => inputChangeHandler(e)} />
                <label htmlFor="password">Password </label>
                <input id="password" name="password" value={credential.password} onChange={(e) => inputChangeHandler(e)} />
                <button onClick={e => loginHandler(e)}>Login</button>
            </StyledForm>
        </div>
    )
}

export default SignIn
