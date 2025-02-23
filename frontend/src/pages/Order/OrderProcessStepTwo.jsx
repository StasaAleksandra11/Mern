import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../../config/stripeConfing';
import { makePayment } from '../../services/paymentService';
import { showLoaderAction } from '../../store/loader/loaderSlice';
import CheckoutForm from './CheckoutForm';

function OrderProcessStepTwo() {
    const [secretKey, setSecretKey] = useState('');
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cartStore);

    const options = {
        // passing the client secret obtained from the server
        clientSecret: secretKey,
    };
    useEffect(() => {
        const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);
        console.log(total, 'total');

        const fetchPayment = async () => {
            dispatch(showLoaderAction(true));
            const res = await makePayment({ amount: total, currency: 'eur' });
            dispatch(showLoaderAction(false));
            if (res.status === 'success') setSecretKey(res.secretKey);
            console.log(res, 'res sa fronta make Payment');
        };
        fetchPayment();
    }, [dispatch, cart]);

    return (
        <div>
            {secretKey && (
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
}

export default OrderProcessStepTwo;
