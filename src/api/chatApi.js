// api/chatApi.js
const API_BASE_URL = 'http://127.0.0.1:8000/api/chat';

export const getChatSessions = async (token) => {
    const response = await fetch(`${API_BASE_URL}/sessions/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};

export const getChatSessionDetail = async (sessionId, token) => {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};

export const createChatSession = async (token) => {
    const response = await fetch(`${API_BASE_URL}/sessions/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};

export const deleteChatSession = async (sessionId, token) => {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return response.ok;
};

export const sendChatMessage = async (message, sessionId, token) => {
    const payload = {
        message: message,
        ...(sessionId && { session_id: sessionId })
    };

    const response = await fetch(`${API_BASE_URL}/message/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    return await response.json();
};