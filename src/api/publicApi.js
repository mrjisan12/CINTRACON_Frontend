import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/api\/?$/, '') || 'http://127.0.0.1:8000';

const pub = axios.create({ baseURL: BASE });

export const getPublicPost = (postId) =>
    pub.get(`/api/home/post/public/${postId}/`);

export const getPublicNote = (noteId) =>
    pub.get(`/api/notes/public/${noteId}/`);

export const getPublicJob = (jobId) =>
    pub.get(`/api/jobs/public/${jobId}/`);

export const getPublicEvent = (eventId) =>
    pub.get(`/api/events/public/${eventId}/`);

export const getShareUrl = (type, id) =>
    `${BASE}/share/${type}/${id}/`;
