import { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';
import { showLoaderAction } from '../../store/loader/loaderSlice';
import { getSingleProduct } from '../../services/productService';
import useCurrencyConverter from '../../utils/useCurrencyConverter';
import { addCart } from '../../store/cart/cartSlice';

function SingleProductPage() {
    const params = useParams();
   const dispatch = useDispatch()
   const [product, setProduct] = useState({})
    const convertPrice = useCurrencyConverter()

    useEffect(()=> {
      const fetchSingleProduct = async () => {
       dispatch(showLoaderAction(true))
        const res = await getSingleProduct(params.productID)
        console.log(res, 'res sa fronta');
        if(res.status === 'success') setProduct(res.product)
        
        dispatch(showLoaderAction(false))
      }
      fetchSingleProduct()
    },[dispatch, params.productID])

    return <>
   <div className="container">
    {Object.prototype.hasOwnProperty.call(product, '_id') && (
        <div className="card mt-4">
             <img className='card-img-top'
              src={`http://localhost:4000/uploads/${product.image}`}
              alt={product.title} />
              <div className="card-body">
                <h4 className='card-title'>{product.title}</h4>
                <p className='card-description'>{product.description}</p>
                <div className='d-flex justify-content-between aligne-items-center'>
                    <span className='badge bg-danger py-3'>{convertPrice(product.price)}</span>
                    <button className='btn btn-primary' onClick={()=>dispatch(addCart(product))}>Add to card</button>
                </div>
              </div>
        </div>
    ) }
   </div>
    </>
}

export default SingleProductPage;
