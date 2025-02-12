import { useEffect, useState } from 'react';
import { getAllProduct } from '../../services/productService';
import { useDispatch } from 'react-redux';
import { showLoaderAction } from '../../store/loader/loaderSlice';
import useCurrencyConverter from '../../utils/useCurrencyConverter';
import './shopPage.scss';
import { routesConfig } from '../../config/routesConfig';
import { Link } from 'react-router-dom';
function ShopPage() {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const convertPrice = useCurrencyConverter();
    useEffect(() => {
        const fetchProduct = async () => {
            dispatch(showLoaderAction(true));
            const res = await getAllProduct();
            dispatch(showLoaderAction(false));
            if (res.status === 'success') {
                setProducts(res.products);
            }
            console.log(res, 'res sa fronta');
        };
        fetchProduct();
    }, [dispatch]);

    return (
        <>
            <div className='container'>
                <div className='row'>
                    {products.length > 0 &&
                        products.map((product, index) => {
                            return (
                                <div key={index} className='col-4 mb-4'>
                                    <div className='card p-3'>
                                        <img
                                            className='card-img-top'
                                            src={`http://localhost:4000/uploads/${product.image}`}
                                            alt={product.title}
                                        />
                                        <div className='card-body'>
                                            <h5 className='card-title'>{product.title}</h5>
                                            <p className='card-text'>{product.description}</p>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-nter'>
                                            <Link to={routesConfig.SINGLE_PRODUCT.dinamicURL(product._id)}>
                                                <button className='btn btn-primary'>View Product</button>
                                            </Link>
                                            <span className='text-uted'>{convertPrice(product.price)}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
}

export default ShopPage;
