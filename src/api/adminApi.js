import api from "./axios";

export const getDashboardStats = () =>
    api.get("admin/dashboard-stats/");

export const getAdminStudents = (data) =>
    api.post("admin/students/", data);

export const deleteAdminStudent = (studentId) =>
    api.delete(`admin/students/${studentId}/`);

export const toggleStudentActive = (studentId) =>
    api.post(`admin/students/${studentId}/toggle-active/`);

export const getAdminForum = (data) =>
    api.post("admin/forum/", data);

export const deleteAdminForumTopic = (topicId) =>
    api.delete(`admin/forum/${topicId}/`);

export const pinAdminForumTopic = (topicId) =>
    api.post(`admin/forum/${topicId}/pin/`);

export const getAdminNotes = (data) =>
    api.post("admin/notes/", data);

export const deleteAdminNote = (noteId) =>
    api.delete(`admin/notes/${noteId}/`);

export const getAdminReports = () =>
    api.get("admin/reports/");

export const resolveAdminReport = (reportId, action) =>
    api.post(`admin/reports/${reportId}/resolve/`, { action });

export const getAdminSettings = () =>
    api.get("admin/settings/");

export const updateAdminSettings = (data) =>
    api.post("admin/settings/update/", data);
