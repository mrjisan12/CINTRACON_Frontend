import api from "./axios";

// Maintenance Status
export const getMaintenanceStatus = () =>
    api.get("maintenance/status");

export const updateMaintenanceStatus = (token, data) =>
    api.post("maintenance/update-status", data, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

export const createMaintenanceStatus = (token, data) =>
    api.post("maintenance/create-status", data, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });