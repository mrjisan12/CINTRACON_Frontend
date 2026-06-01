import api from "./axios";

export const getMaintenanceStatus = () =>
    api.get("maintenance/status");

export const updateMaintenanceStatus = (data) =>
    api.post("maintenance/update-status", data);

export const createMaintenanceStatus = (data) =>
    api.post("maintenance/create-status", data);
