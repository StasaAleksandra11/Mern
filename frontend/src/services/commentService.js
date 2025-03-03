import axios from 'axios';

export const addComment = async (comment) => {
    try {
        const res = await axios.post('/api/comment', comment);

        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message,
            };
        }
    } catch (err) {
        return {
            status: err.response?.data?.err.status,
            message: err.response?.data?.message,
        };
    }
};

export const getProductComments = async (productID) => {
    try {
        const res = await axios.get(`/api/comment/filter/${productID}`);

        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                allComments: res.data.allComments,
            };
        }
    } catch (err) {
        return {
            status: err.response?.data?.err.status,
            message: err.response?.data?.message,
        };
    }
};

export const getAllProduct = async () => {
    try {
        const res = await axios.get('/api/comment');

        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                allComments: res.data.allComments,
            };
        }
    } catch (err) {
        return {
            status: err.response?.data?.err.status,
            message: err.response?.data?.message,
        };
    }
};

export const changeCommmentStatus = async (commentID, status) => {
    try {
        const res = await axios.patch('/api/comment', { commentID, status });

        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                // allComments: res.data.allComments
            };
        }
    } catch (err) {
        return {
            status: err.response?.data?.err.status,
            message: err.response?.data?.message,
        };
    }
};

export const deleteComment = async (commentID) => {
    try {
        const res = await axios.delete(`/api/comment/filter/${commentID}`);

        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message,
            };
        }
    } catch (err) {
        return {
            status: err.response?.data?.err.status,
            message: err.response?.data?.message,
        };
    }
};
