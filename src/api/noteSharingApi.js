import api from "./axios";

export const getAllNotes = async (page = 1, size = 10, filters = {}, token) => {
    const response = await api.post("/note-sharing/all-notes",
        {
            page,
            size,
            ...filters
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

export const getNoteDetail = async (noteId, token) => {
    const response = await api.get(`/note-sharing/detail/${noteId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

export const createNote = async (noteData, token) => {
    const response = await api.post("/note-sharing/create", noteData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return response.data;
};

export const updateNote = async (noteId, noteData, token) => {
    const response = await api.post(`/note-sharing/update/${noteId}`, noteData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return response.data;
};

export const increaseDownloadCount = async (noteId, token) => {
    const response = await api.post(`/note-sharing/increase-download/${noteId}`,  // Changed to POST
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};