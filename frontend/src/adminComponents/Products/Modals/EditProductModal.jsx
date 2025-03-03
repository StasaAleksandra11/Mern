import Modal from 'react-modal';
import customEditModalStyles from '../../../../public/css/js/customEditModalStyles';
import Label from '../../../components/Label/Label';
import Button from '../../../components/Button/Button';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { showLoaderAction } from '../../../store/loader/loaderSlice';
import { editSingleProduct } from '../../../services/adminService';

function EditProductModal({ setIsEditModal, currentProduct, fetchProduct }) {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [updateProduct, setUpdateProduct] = useState({
        id: currentProduct?._id,
        title: currentProduct?.title,
        description: currentProduct?.description,
        price: currentProduct?.price,
        image: currentProduct?.image,
    });

    const closeEditModel = (e) => {
        e.preventDefault();
        setIsEditModal(false);
    };

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };

    const handleChange = (e) => {
        const newProduct = { ...updateProduct };
        const { id, value } = e.target;
        newProduct[id] = id === 'price' ? parseInt(value) : value
        setUpdateProduct(newProduct);
    };


    const handleSubmit = async(e) => {
        e.preventDefault()
        
        let formDataProduct;
        if(file){
            formDataProduct = new FormData();
            formDataProduct.append('file', file)
            formDataProduct.append('product', JSON.stringify(updateProduct))
        }

        let hasFormData = formDataProduct && formDataProduct.has('product') && formDataProduct.has('file')
        dispatch(showLoaderAction(true))
        const res = await editSingleProduct(hasFormData? formDataProduct : updateProduct)
        console.log(res, 'res iz edita');
        dispatch(showLoaderAction(false))
        if(res.status === 'success'){
            fetchProduct();
            setIsEditModal(false)
            toast.success(res.message)
        } else{
            setIsEditModal(false)
            toast.warning(res.message)
        }
        
    }

    return (
        <>
        {console.log(updateProduct, 'update')
        }
        <Modal isOpen={true} ariaHideApp={false} style={customEditModalStyles} centered>
            <form onSubmit={handleSubmit}>
                <h3>Edit product {currentProduct.title}</h3>

                <div className='input-wrapper mt-4'>
                    <Label htmlFor='title'>Title</Label>
                    <input className='form-control' type='text' id='title' defaultValue={updateProduct.title} onChange={handleChange} />
                </div>
                <div className='input-wrapper mt-4'>
                    <Label htmlFor='title'>Description</Label>
                    <input
                        className='form-control'
                        type='text'
                        id='description'
                        defaultValue={updateProduct.description}
                        onChange={handleChange}
                    />
                </div>
                <div className='input-wrapper mt-4'>
                    <Label htmlFor='title'>Price</Label>
                    <input className='form-control' type='number' id='price' defaultValue={updateProduct.price} onChange={handleChange} />
                </div>
                <div className='input-wrapper mt-4'>
                    <Label htmlFor='title'>Image</Label>
                    <input className='form-control' type='file' id='image' onChange={handleFile} />
                </div>
                <div className='btns-wrapper mt-4 d-flex justify-content-between '>
                    <Button className='btn btn-primary' onClick={closeEditModel}>
                        Cancel
                    </Button>
                    <Button className='btn btn-success'>Update</Button>
                </div>
            </form>
        </Modal>
        </>
    );
}

export default EditProductModal;
