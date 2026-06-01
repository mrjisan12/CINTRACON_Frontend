import api from "./axios";

export const getProfileInfo = (filters = {}) => {
    const { page = 1, size = 10 } = filters;
    return api.post("auth/user-profile", { page, size });
};

export const getProfileById = (userId, filters = {}) => {
    const { page = 1, size = 10 } = filters;
    return api.post(`auth/user-profile-by-id/${userId}`, { page, size });
};

export const updateProfile = (formData) => {
    return api.post("auth/user-profile-update", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
