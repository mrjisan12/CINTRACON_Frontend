import api from "./axios";

export const postJob = async (jobData, token) => {
    const response = await api.post("/job-opportunities/create", jobData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getAllJobs = async (page = 1, size = 10, token) => {

    const response = await api.post("/job-opportunities/all-jobs",
        {
            page,
            size
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};


export const deleteJob = async (jobId, token) => {

    const response = await api.delete(`/job-opportunities/delete/${jobId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};