import api from "./axios";

// Create New Event (Authenticated)
export const createEvent = (formData, token) =>
    api.post("events/create",
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        }
    );

// Get All Events (Authenticated)
export const getAllEvents = (data, token) =>
    api.post("events/all-events",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );

// Toggle Event Interest (Authenticated)
export const toggleEventInterest = (eventId, token) =>
    api.get(`events/interest/${eventId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );

// Update Event (Authenticated)
export const updateEvent = (eventId, formData, token) =>
    api.post(`events/update/${eventId}`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        }
    );

// Delete Event (Authenticated)
export const deleteEvent = (eventId, token) =>
    api.delete(`events/delete/${eventId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

// Get User's Interested Events (Authenticated)
export const getUserInterestedEvents = (data, token) =>
    api.post("events/my-interests",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );