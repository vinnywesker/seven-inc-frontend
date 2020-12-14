import Axios from './axios';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { authContext, propsChildren } from '../config/types';
import { getToken, setToken } from '../services/localToken'

const AuthContext = createContext<authContext>({} as authContext);


const AuthProvider = ({ children }: propsChildren) => {
    const history = useHistory();

    const [userToken, setUsertoken] = useState<string | null>(null);

    useEffect(() => {
        if (getToken()) setUsertoken(getToken());
    }, [])

    const login = async (user: string, password: string, remember: boolean) => {
        const response = await Axios.post('/login', {
            username: user,
            password: password
        })

        const { token } = response.data;
        if (token) {
            setToken(token, remember);
            setUsertoken(token);
            history.push('/main');
        }

        else alert("Usuário ou senha incorretos!");
    }

    const singOut = () => {
        history.push('/login');
        setToken(null);
        setUsertoken(null);
    }
    return (
        <AuthContext.Provider value={{ auth: !!userToken, usertoken: userToken, login, singOut }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;

export const useAuth = () => useContext(AuthContext);