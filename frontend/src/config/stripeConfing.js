import { loadStripe } from '@stripe/stripe-js';

const publicKey = 'pk_test_51Qv3RxK6LpDphrL4LiXCnBJ1qU25k63m3jggF3OL0x5gWtwSgm1kl94PiRX6OS8VKphXvhohR6AhZBT43qcbeqv500JLVLqK24';
const stripePromise = loadStripe(publicKey);
export default stripePromise;
