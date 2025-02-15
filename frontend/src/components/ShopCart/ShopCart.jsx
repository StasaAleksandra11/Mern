import { IoCartSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { routesConfig } from '../../config/routesConfig';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './shopCart.scss';

function ShopCart() {
    const [isSumary, setIsSummary] = useState(false);
    const { cart } = useSelector((state) => state.cartStore);
 
    useEffect(() => {
        console.log(cart, 'cart');
    }, [cart])


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
                    <span>+</span>
                    <span>1</span>
                    <span>-</span>
                </div>
                <div className="price">Total: $1344</div>
                <div className='remove'>Remove</div>
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
