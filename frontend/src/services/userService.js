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
        console.log(res, 'res iz servisa');
        return res;
    } catch (err) {
        console.log(err, 'error iz servisa');
    }
};
