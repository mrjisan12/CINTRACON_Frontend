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


// Newsfeed Posts (Authenticated)
export const getNewsfeedPosts = (page = 1, size = 10, token) =>
    api.post("home/newsfeed",
        { page, size }, // Request body
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

// Post Details (Authenticated - if needed)
export const getPostDetails = (postId, token) =>
    api.get(`home/post/details/${postId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });


// Add Reaction to Post (Authenticated)
export const addReaction = (postId, reactionType, token) =>
    api.post(`home/post/reaction/${postId}`,
        { reaction_type: reactionType },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );


// Add Comment to Post (Authenticated)
export const addComment = (postId, content, token) =>
    api.post(`home/post/comment/${postId}`,
        { content },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );


// Create New Post (Authenticated)
export const createPost = (formData, token) =>
    api.post("home/post/create",
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        }
    );


// Update Post (Authenticated)
export const updatePost = (postId, data, token) =>
    api.post(`home/post/update/${postId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

// Delete Post (Authenticated)
export const deletePost = (postId, token) =>
    api.delete(`home/post/delete/${postId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });



// Developers List (Authenticated)
export const getDevelopers = (token) =>
    api.get("home/developers", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
