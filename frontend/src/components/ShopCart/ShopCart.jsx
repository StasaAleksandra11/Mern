import { IoCartSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { routesConfig } from '../../config/routesConfig';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {FaMinusCircle, FaPlusCircle, FaTrashAlt} from 'react-icons/fa'
import './shopCart.scss';
import useCurrencyConverter from '../../utils/useCurrencyConverter';
import { toast } from 'react-toastify';
import { setNewOld, removeItem, handleCountItem } from '../../store/cart/cartSlice';
import { localStorageConfig } from '../../config/localStorageConfig';

function ShopCart() {
    const dispatch = useDispatch()
    const [isSumary, setIsSummary] = useState(false);
    const { cart } = useSelector((state) => state.cartStore);
    const {isNewItem} = useSelector((state) =>state.cartStore)
    const {isOldItem} = useSelector((state) =>state.cartStore)
    const convertPrice = useCurrencyConverter()
 
    useEffect(() => {
       
        isNewItem && toast.success('New product Added')
        isOldItem && toast.warning('You increased this product quantity')
        dispatch(setNewOld())
    }, [cart, isNewItem, isOldItem, dispatch])

    useEffect(()=> {
        if(cart.length) localStorage.setItem(localStorageConfig.CART, JSON.stringify(cart))
    },[cart])


    const displayAllItems = () => {
        return cart.map((item, index) => {
          return <div className='shop-cart-item' key={index}>
            <img 
            src={`http://localhost:4000/uploads/${item.image}`}
            alt={item.title} />
            <div className='content'>
                <div className='title'>{item.title}</div>
                <div className='count'>
                    <span>Count: </span>
                    <span> 
                    <FaMinusCircle onClick={() => dispatch(handleCountItem({index, isIncrease : false}))}/> 
                    </span>
                    <span>{item.count}</span>
                    <span>
                        <FaPlusCircle onClick={() => dispatch(handleCountItem({index, isIncrease : true}))}/>
                    </span>
                </div>
                <div className="price">Total: {convertPrice(item.totalPrice)}</div>
                <div className='remove' onClick={() => dispatch(removeItem(index))} ><FaTrashAlt/></div>
            </div>
          </div>
        })
    }

    return (
        <>
            <div onMouseEnter={() => setIsSummary(true)} onMouseLeave={() => setIsSummary(false)} className='shop-cart'>
                <Link to={routesConfig.ORDER.url}>
                    <IoCartSharp />
                    <span className='shop-cart-badge'>{cart.length ? cart.length : null}</span>
                </Link>

                {isSumary && (
                    <div className='shop-cart-summary'>
                        <div className='shop-cart-items'> {displayAllItems()} </div>
                        <div className='order-btn'>
                            <button className='btn btn-sm btn-primary'>
                                <Link to={routesConfig.ORDER.url}>Go to Checkout</Link>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ShopCart;
