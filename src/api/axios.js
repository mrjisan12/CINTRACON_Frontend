import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Auth endpoints that should NOT trigger a redirect on 401
const AUTH_ENDPOINTS = [
    'auth/login', 'auth/signup', 'auth/verify-email',
    'auth/resend-verification', 'auth/send-otp', 'auth/check-otp',
    'auth/reset-password',
    'maintenance/status', // public endpoint — 401 should never redirect
];

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const url = error.config?.url || '';

        if (status === 429) {
            toast.error("Too many requests. Please wait and try again.");
        }

        if (status === 401) {
            const isAuthEndpoint = AUTH_ENDPOINTS.some(ep => url.includes(ep));
            if (!isAuthEndpoint) {
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
            }
        }

        if (status === 403) {
            const msg = error.response?.data?.msg;
            if (msg) toast.error(msg);
        }

        return Promise.reject(error);
    }
);

export default api;
