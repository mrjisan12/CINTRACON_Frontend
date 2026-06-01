import api from "./axios";

export const getNotifications = (page = 1, size = 20) =>
    api.get(`notifications/?page=${page}&size=${size}`);

export const markNotificationsRead = (data) =>
    api.post("notifications/mark-read/", data);

export const deleteNotification = (id) =>
    api.delete(`notifications/${id}/`);
