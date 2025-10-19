import api from "./axios";

// Get current user profile
export const getProfileInfo = (token, filters = {}) => {
    const { page = 1, size = 10 } = filters;

    return api.post("auth/user-profile",
        {
            page,
            size
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

// Get user profile by ID
export const getProfileById = (token, userId, filters = {}) => {
    const { page = 1, size = 10 } = filters;

    return api.post(`auth/user-profile-by-id/${userId}`,
        {
            page,
            size
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};


// Update user profile
export const updateProfile = (token, formData) => {
    return api.post("auth/user-profile-update", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    });
};