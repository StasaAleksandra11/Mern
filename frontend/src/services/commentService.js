import axios from 'axios';

export const addComment = async (comment) => {
    try {
        const res = await axios.post('/api/comment', comment);

        if (res.status === 200 && res.data.status === 'success') {
            console.log(res);
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
         console.log(res, 'res iz servisa get comment');
         
        if (res.status === 200 && res.data.status === 'success') {
            console.log(res, 'res iz servisa GET all product');
            return {
                status: res.data.status,
                allComments: res.data.allComments
            };
        }
    } catch (err) {
        return {
            status: err.response?.data?.err.status,
            message: err.response?.data?.message,
        };
    }
};
