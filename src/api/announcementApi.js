import api from "./axios";

export const getAllAnnouncements = (filters = {}) => {
    const { search = "", page = 1, size = 10 } = filters;
    return api.post("announcement/all", { search, page, size });
};

export const getAnnouncementDetail = (id) =>
    api.get(`announcement/detail/${id}`);

export const createAnnouncement = (data) =>
    api.post("announcement/create", data);

export const updateAnnouncement = (id, data) =>
    api.post(`announcement/update/${id}`, data);

export const deleteAnnouncement = (id) =>
    api.delete(`announcement/delete/${id}`);
