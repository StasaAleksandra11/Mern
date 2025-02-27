import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCart } from '../../store/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { routesConfig } from '../../config/routesConfig';
import { localStorageConfig } from '../../config/localStorageConfig';

function OrderPaymentMessage(  {paymentMessage} ) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (paymentMessage === 'succeeded') {
            dispatch(setCart([]));
            localStorage.removeItem(localStorageConfig.CART)
            setTimeout(() => navigate(routesConfig.SHOP.url), 5000);
        }
    },[dispatch, paymentMessage,navigate]);
    

    return <div>
        <h3>ovde sam</h3>
        {paymentMessage}</div>;
}

export default OrderPaymentMessage;
