import { STORAGE } from '../config/envVars'


export const getToken = (): string | null => {
    const local = localStorage.getItem(STORAGE);
    const session = sessionStorage.getItem(STORAGE);
    if (local) return local;
    else if (session) return session;
    else return null;
}

export const setToken = (token: string | null, remember?: boolean): void => {
    if (token && remember) localStorage.setItem(STORAGE, token as string);
    else if (token) sessionStorage.setItem(STORAGE, token as string);
    else {
        localStorage.removeItem(STORAGE);
        sessionStorage.removeItem(STORAGE);
    }
};

