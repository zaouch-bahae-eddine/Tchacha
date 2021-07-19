import { useMutation } from '@apollo/client';
import React, { useState, useContext, createContext, useEffect } from 'react';
import { LOGIN, REGISTER } from '../Queries/AuthQuery';

const authContext = createContext();
export function AuthProvider({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
};
export function useAuth() {
    return useContext(authContext);
};

const useProvideAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if(localStorage.getItem('token') != "" && localStorage.getItem('token') != undefined){
            const userToken =  localStorage.getItem('token').split('.')[1];
            setUser(JSON.parse(atob(userToken)));
        }
    }, [])

    const [LoginMutation, {data}] = useMutation(LOGIN, {
        onCompleted: (data) => {
            if(data.login.status === 200){
                localStorage.setItem('token', data.login.jwt);
                setUser(JSON.parse(atob(data.login.jwt.split('.')[1])));
            }
        }
    });
    const [RegisterMutation] = useMutation(REGISTER, {
        onCompleted: (data) => {
            if(data.register.status >= 200 && data.register.status < 300){
                localStorage.setItem('token', data.register.jwt);
                setUser(JSON.parse(atob(data.register.jwt.split('.')[1])));
            }
        }
    });
    const login = async (email, password) => {
        const result = await LoginMutation({variables: {loginEmail: email, loginPassword: password}});
        return result.data.login;
    };

    const register = async (credetial) => {
        try{
            const result = await RegisterMutation({variables: {registerUser: {
                name: credetial.userName,
                email: credetial.email,
                password: credetial.password
            }}});
            console.log(result);
            return result.data.register;
        } catch(e) {
            console.log(e);
        }
    };

    const logout = () => {
        localStorage.setItem('token', "");
        setUser(null);
    }
    return {
        user,
        login,
        logout,
        register
    }
}