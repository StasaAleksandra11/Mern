import { useEffect, useState } from 'react';
import OrderFooter from './OrderFooter';
import OrderProcessSteoOne from './OrderProcessSteoOne';
import OrderProcessStepTwo from './OrderProcessStepTwo';
import { useSelector } from 'react-redux';
import {useSearchParams} from 'react-router-dom'
import OrderPaymentMessage from './OrderPaymentMessage'

function OrderPage() {
    const { cart } = useSelector((state) => state.cartStore);
    const { currentStep } = useSelector((state) => state.orderStore);
    const [searchParams] = useSearchParams()
    const [paymentMessage, setPaymentMessage] = useState('')
    useEffect(() => {
        if(searchParams.get('redirect_status')) setPaymentMessage(searchParams.get('redirect_status'))
    },[searchParams])

    const displayOrderProcessStep = () => {
        if(paymentMessage) return <OrderPaymentMessage paymentMessage={paymentMessage}/>
        if (currentStep === 1) return <OrderProcessSteoOne />;
        if (currentStep === 2) return <OrderProcessStepTwo />;
    };

    const displayOrderFooter = () => {
        if (cart.length && currentStep === 1) return <OrderFooter />;
    };

    return (
        <>
        {console.log(cart, 'cart')
        }
            <div className='container'>
                {displayOrderProcessStep()}
                {displayOrderFooter()}
            </div>
        </>
    );
}

export default OrderPage;
