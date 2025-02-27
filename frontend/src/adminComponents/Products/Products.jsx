import { useEffect, useState } from 'react';
import { getAllProduct } from '../../services/productService';
import { useDispatch } from 'react-redux';
import { showLoaderAction } from '../../store/loader/loaderSlice';
import './products.scss';
import DeleteProductModal from './Modals/DeleteProductModal';
function Products() {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState([]);


    const fetchProduct = async () => {
        dispatch(showLoaderAction(true));
        const res = await getAllProduct();
        dispatch(showLoaderAction(false));

        if (res.status === 'success') setProducts(res.products);
        console.log(res, 'res iz productaaaa');
    };


    useEffect(() => {
        fetchProduct();
    }, []);

    const displayProductView = () => {
        return products.map((product, index) => {
            return (
                <tr key={index}>
                    <th>{index + 1}</th>
                    <th>
                        <img src={`http://localhost:4000/uploads/${product.image}`} alt={product.title} />
                    </th>
                    <th>{product.title}</th>
                    <th>{product.price}</th>
                    <td>
                        <div className='btns-wrapper'>
                            <button className='btn btn-warning'>Edit</button>
                            <button className='btn btn-danger' onClick={() => deleteProduct(product)}>
                                Delete
                            </button>
                        </div>
                    </td>
                </tr>
            );
        });
    };

    const deleteProduct = (product) => {
        setIsDeleteModal(true);
        setCurrentProduct(product);
    };

    return (
        <>
            <div className='table-product'>
                <table className='table table-striped table-boarder table-hover table-dark'>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{products && displayProductView()}</tbody>
                </table>
            </div>
            {isDeleteModal &&   <DeleteProductModal  setIsDeleteModal={setIsDeleteModal} currentProduct={currentProduct} fetchProduct={fetchProduct} />}
        </>
    );
}

export default Products;
