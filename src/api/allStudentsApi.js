import api from "./axios";

// All Students (Authenticated)
export const getAllStudentsInfo = (token, filters = {}) => {
    const { department = "", semester = "", search = "", page = 1, size = 10 } = filters;

    return api.post("all-students/",
        {
            department,
            semester,
            search,
            page,
            size
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
