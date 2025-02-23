import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import OrderFooter from './OrderFooter'
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const submitPayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/order",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
   <>
   <PaymentElement />
   <OrderFooter  submitPayment={submitPayment}/>

   </>
   
  )
};

export default CheckoutForm;