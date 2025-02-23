import { useDispatch, useSelector } from 'react-redux';
import './orderFooter.scss';
import { handleCurrentStep } from '../../store/cart/orderSlice';
import { FaChevronLeft, FaChevronRight, FaCheck } from 'react-icons/fa';

function OrderFooter({submitPayment}) {
    const dispatch = useDispatch();
    const { currentStep } = useSelector((state) => state.orderStore);
    return (
        <div className='buttons-wrapper' style={currentStep === 1 ? { justifyContent: 'flex-end' } : { justifyContent: 'space-between' }}>
            {currentStep > 1 && (
                <button onClick={() => dispatch(handleCurrentStep(-1))} className='btn btn-warning btn-back'>
                    {' '}
                    <FaChevronLeft /> Back
                </button>
            )}
            {currentStep === 1 ? (
                <button onClick={() => dispatch(handleCurrentStep(1))} className='btn btn-success btn-proceed'>
                    {' '}
                    Procces to Payment <FaChevronRight />
                </button>
            ) : (
                <button onClick={submitPayment} className='btn btn-success'>
                    {' '}
                    <FaCheck /> Submit Payment
                </button>
            )}
        </div>
    );
}

export default OrderFooter;
