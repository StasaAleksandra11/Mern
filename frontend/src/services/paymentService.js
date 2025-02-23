import axios from 'axios'

export const makePayment = async (paymentInfo) => {
    
  try {
   const res  = await axios.post('/api/payment', paymentInfo)    
   console.log(res, 'res iz servisa payment');
   if(res.status === 200 && res.data.status === 'success'){
    return {
        status: res.data.status,
        secretKey: res.data.secretKey
    }
   }
   return res;
   
  } catch (err) {
    return {
        status: err.response?.data?.err.status,
        message: err.response?.data?.message,
    };
    
    
  }

} 