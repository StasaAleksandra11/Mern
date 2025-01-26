import axios from 'axios';

export const register = async (user) => {
    try {
        const res = await axios.post('api/user/register', user);
        console.log(res, 'res iz servisa');
        return res;
    } catch (err) {
        console.log(err, 'error iz servisa');
    }
};
