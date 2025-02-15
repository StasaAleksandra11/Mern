import axios from 'axios';
export const getAllProduct = async () => {
    try {
        const res = await axios.get('/api/product');
        console.log(res, 'res  iz servisa');

        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                products: res.data.products,
            };
        }
    } catch (err) {
        return {
            status: err.response?.data?.err.status,
            message: err.response?.data?.message,
        };
    }
};

export const getSingleProduct = async (productID) => {
    try {
        const res = await axios.get(`/api/product/single/${productID}`);
        console.log(res, 'res za single product');
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                product: res.data.product,
            };
        }
        return {
            status: res.data.status,
            message: res.data.message,
        };
    } catch (err) {
        return {
            status: err.response?.data?.err.status,
            message: err.response?.data?.message,
        };
    }
};
