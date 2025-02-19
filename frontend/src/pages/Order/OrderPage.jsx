import OrderFooter from './OrderFooter';
import OrderProcessSteoOne from './OrderProcessSteoOne';
import OrderProcessStepTwo from './OrderProcessStepTwo';
import { useSelector } from 'react-redux';

function OrderPage() {
    const { cart } = useSelector((state) => state.cartStore);
    const { currentStep } = useSelector((state) => state.orderStore);
    const displayOrderProcessStep = () => {
        if (currentStep === 1) return <OrderProcessSteoOne />;
        if (currentStep === 2) return <OrderProcessStepTwo />;
    };

    const displayOrderFooter = () => {
        if (cart.length) return <OrderFooter />;
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
