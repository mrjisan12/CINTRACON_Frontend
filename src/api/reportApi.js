// api/reportApi.js
import api from "./axios";

// Report Post
export const reportPost = (postId, reportData, token) => {
    return api.post(`home/post/report/${postId}`, reportData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};