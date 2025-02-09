import axios from 'axios';
export const addProduct = async (product) => {
    try {
        const res = await axios.post('/api/admin/product', product, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(res, 'res iz servisa add product');
        return res;
    } catch (err) {
        console.log(err, 'error iz Add Product Servisa');
        return err;
    }
};
