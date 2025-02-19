import { useSelector } from "react-redux";
import './orderFooter.scss';

function OrderFooter() {
    const { currentStep } = useSelector((state) => state.orderStore);
  return (
    <div className="buttons-wrapper" style={currentStep === 1 ? {justifyContent: 'flex-end'} : {justifyContent: 'space-between'}}>
      {currentStep > 1 && <button>Back</button>}
      {currentStep === 1 ? <button>Procces to Payment</button> : <button>Submit to Payment</button>}
    </div>
  )
}

export default OrderFooter