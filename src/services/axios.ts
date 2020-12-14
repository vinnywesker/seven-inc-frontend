import axios from "axios";

import { getToken } from "./localToken";
import { URL_BACKEND } from '../config/envVars'

const api = axios.create({
    baseURL: URL_BACKEND
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;