import axios from 'axios';
export const addProduct = async (product) => {
    try {
        const res = await axios.post('/api/admin/product', product, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
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



export const deleteSingleProduct = async ({productID, productImage}) => {
    try {
        const res = await axios.delete(`/api/admin/product/${productID}/${productImage}`)
        console.log(res, 'res iz delete single produkta iz servisa');
        
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message,
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


export const editSingleProduct = async (productData) => {

 try {

    const res = await axios.put('/api/admin/product/', productData)
  
   

    if (res.status === 200 && res.data.status === 'success') {
        return {
            status: res.data.status,
            message: res.data.message,
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

}