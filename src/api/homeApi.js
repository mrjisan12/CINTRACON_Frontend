import api from "./axios";

export const getNavbarInfo = () =>
    api.get("home/navbar-info");

export const getRightSidebarInfo = () =>
    api.get("home/right-sidebar-info");

export const getNewsfeedPosts = (page = 1, size = 10) =>
    api.post("home/newsfeed", { page, size });

export const getPostDetails = (postId) =>
    api.get(`home/post/details/${postId}`);

export const addReaction = (postId, reactionType) =>
    api.post(`home/post/reaction/${postId}`, { reaction_type: reactionType });

export const addComment = (postId, content) =>
    api.post(`home/post/comment/${postId}`, { content });

export const createPost = (formData) =>
    api.post("home/post/create", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const updatePost = (postId, data) =>
    api.post(`home/post/update/${postId}`, data);

export const deletePost = (postId) =>
    api.delete(`home/post/delete/${postId}`);

export const getDevelopers = () =>
    api.get("home/developers");

// Bookmark (toggle)
export const bookmarkPost = (postId) =>
    api.post(`home/post/bookmark/${postId}`);

export const getMyBookmarks = (page = 1, size = 10) =>
    api.get(`home/my-bookmarks?page=${page}&size=${size}`);

// Global search
export const globalSearch = (query, type = 'all') =>
    api.get(`home/search?q=${encodeURIComponent(query)}&type=${type}`);
