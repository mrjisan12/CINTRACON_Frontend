import api from "./axios";

export const reportPost = (postId, reportData) =>
    api.post(`home/post/report/${postId}`, reportData);
