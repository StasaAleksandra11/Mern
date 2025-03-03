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
           
        };
        fetchProduct();
    }, [dispatch]);

    return (
        <>
            <div className='container mt-4'>
                <div className='row'>
                    {products.length > 0 &&
                        products.map((product, index) => {
                            return (
                                <div key={index} className='col-4 mb-4'>
                                    <div className='card p-3'>
                                        <img
                                            className='card-img-top'
                                            src={`https://backendmern-vtsf.onrender.com/uploads/${product.image}`}
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
                                            <span className='badge bg-success py-3'>{convertPrice(product.price)}</span>
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
