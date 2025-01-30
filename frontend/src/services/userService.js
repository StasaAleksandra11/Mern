import axios from 'axios';

export const register = async (user) => {
    try {
        const res = await axios.post('/api/user/register', user);

        if (res.status === 200 && res.data.status === 'success') {
            console.log('res iz servisa');
            return {
                status: res.data.status,
                message: res.data.message,
            };
        }
        return {
            status: res.data.error.status,
            message: res.data.message,
        };
    } catch (err) {
        console.log(err, 'greskaa izz servisaaa');
        return {
            status: err.response?.data?.err.status,
            message: err.response?.data?.message,
        };
    }
};
