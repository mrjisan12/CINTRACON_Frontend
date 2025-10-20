import api from "./axios";

// Announcements (Authenticated)
export const getAllAnnouncements = (token, filters = {}) => {
    const { search = "", page = 1, size = 10 } = filters;

    return api.post("/announcement/all",
        {
            search,
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

export const getAnnouncementDetail = (token, id) => {
    return api.get(`/api/announcement/detail/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};