import api from "./axios";

export const login = (data) =>
    api.post("auth/login", data);

export const signup = (data) => {
    const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
    return api.post("auth/signup", data, {
        headers: isFormData ? {} : { "Content-Type": "application/json" },
    });
};

export const verifyEmail = (data) =>
    api.post("auth/verify-email", data);

export const resendVerification = (data) =>
    api.post("auth/resend-verification", data);

export const sendOtp = (data) =>
    api.post("auth/send-otp", data);

export const checkOtp = (data) =>
    api.post("auth/check-otp", data);

export const resetPassword = (data) =>
    api.post("auth/reset-password", data);

export const logout = () =>
    api.post("auth/logout", {});

export const getProfileInfo = (filters = {}) => {
    const { page = 1, size = 10 } = filters;
    return api.post("auth/user-profile", { page, size });
};

export const getProfileById = (userId) =>
    api.post(`auth/user-profile-by-id/${userId}`);

export const updateProfile = (data) => {
    const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
    return api.post("auth/user-profile-update", data, {
        headers: isFormData ? {} : { "Content-Type": "application/json" },
    });
};

// Follow / Unfollow (toggle)
export const followUser = (userId) =>
    api.post(`auth/follow/${userId}/`);

export const getFollowers = (userId) =>
    api.get(`auth/followers/${userId}/`);

export const getFollowing = (userId) =>
    api.get(`auth/following/${userId}/`);
