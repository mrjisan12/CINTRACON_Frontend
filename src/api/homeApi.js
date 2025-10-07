import api from "./axios";

// Navbar Info (Authenticated)
export const getNavbarInfo = (token) =>
    api.get("home/navbar-info", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

// Right Sidebar Info (Authenticated)
export const getRightSidebarInfo = (token) =>
    api.get("home/right-sidebar-info", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });