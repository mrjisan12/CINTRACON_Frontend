import api from "./axios";

// Login
export const login = (data) =>
    api.post("auth/login", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });

// Register
export const signup = (data) => {
    const isFormData =
        typeof FormData !== "undefined" && data instanceof FormData;

    // Let Axios set the correct multipart boundary automatically for FormData.
    // Keep JSON header when sending plain objects.
    return api.post("auth/signup", data, {
        headers: isFormData ? {} : { "Content-Type": "application/json" },
    });
};


// Profile (Authenticated)
export const getProfile = (token) =>
    api.get("auth/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

// Register
export const sendOtp = (data) =>
    api.post("auth/send-otp", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });

// Logout
export const logout = (token) =>
    api.post("auth/logout", {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

// Check OTP
export const checkOtp = (data) =>
    api.post("auth/check-otp", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });

// Reset Password
export const resetPassword = (data) =>
    api.post("auth/reset-password", data, {
        headers: { "Content-Type": "application/json" },
    });
