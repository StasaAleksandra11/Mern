import Label from '../../components//Label/Label.jsx';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';
import { useRef, useState } from 'react';
import { addProduct } from '../../services/adminService.js';
import { useDispatch } from 'react-redux';
import { showLoaderAction } from '../../store/loader/loaderSlice.js';
import { toast } from 'react-toastify';
import './addProduct.scss';
function AddProduct() {
    const dispatch = useDispatch();
    const formRef = useRef();
    const [file, setFile] = useState(null);
    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
    });
    const handleChange = (e) => {
        const { id, value } = e.target;
        const newProduct = { ...product };
        newProduct[id] = value;
        setProduct(newProduct);
    };
    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = new FormData();
        newProduct.append('product', JSON.stringify(product));
        newProduct.append('file', file);
        dispatch(showLoaderAction(true));
        const res = await addProduct(newProduct);
        dispatch(showLoaderAction(false));
        if (res.status === 'success') {
            formRef.current.reset();
            setProduct({
                title: '',
                description: '',
                price: '',
            });
            setFile(null);
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
       
    };

    return (
        <>
            {console.log(product, 'product')}
            <div className='add-product-wrapper'>
                <div className='content'>
                    <h1>Add product</h1>
                </div>
                <form onSubmit={handleSubmit} ref={formRef} className='add-product-form'>
                    <div className='input-wrapper'>
                        <Label htmlFor='title'>Title</Label>
                        <Input type='text' id='title' placeholder='input product title' onChange={handleChange} />
                    </div>
                    <div className='input-wrapper'>
                        <Label htmlFor='title'>Description</Label>
                        <Input type='text' id='description' placeholder='Type product description' onChange={handleChange} />
                    </div>
                    <div className='input-wrapper'>
                        <Label htmlFor='title'>Price</Label>
                        <Input type='number' id='price' placeholder='input product price in EURO' onChange={handleChange} />
                    </div>
                    <div className='input-wrapper'>
                        <Label htmlFor='title'>Image</Label>
                        <Input type='file' id='image' onChange={handleFile} />
                    </div>
                    <Button className='btn btn-primary'>Add Product</Button>
                </form>
            </div>
        </>
    );
}

export default AddProduct;
