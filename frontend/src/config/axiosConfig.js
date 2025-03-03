import axios from 'axios';
import { getToken } from '../utils/getToken';

axios.defaults.baseURL = 'https://backendmern-avj0.onrender.com';

axios.interceptors.request.use(
    function (config) {
        const token = getToken();
        if (token) config.headers.Authorization = token;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
