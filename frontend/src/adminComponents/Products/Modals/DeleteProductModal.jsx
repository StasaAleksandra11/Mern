import Modal from 'react-modal';
import customModalStyles from '../../../../public/css/js/customModalStyles';
import { deleteSingleProduct } from '../../../services/adminService';
import { useDispatch } from 'react-redux';
import { showLoaderAction } from '../../../store/loader/loaderSlice';
import { toast } from 'react-toastify';

function DeleteProductModal({ setIsDeleteModal, currentProduct, fetchProduct }) {
    const dispatch = useDispatch();

    const deleteCurrenteProduct = async () => {
        dispatch(showLoaderAction(true));
        const res = await deleteSingleProduct({ productID: currentProduct._id, productImage: currentProduct.image });
        dispatch(showLoaderAction(false));
        console.log(res, 'ees');

        if (res.status === "succcess") {
            setIsDeleteModal(false);
            toast.success(res.message);
            fetchProduct()
        } else {
            toast.error(res.message);
        }
    };

    return (
        <Modal isOpen={true} ariaHideApp={false} style={customModalStyles} centered>
            <div className='text-center'>
                <h2>Delete {currentProduct.title} product</h2>
                <div className='btns-wrapper mt-4 d-flex justify-content-between '>
                    <button className='btn btn-primary' onClick={() => setIsDeleteModal(false)}>
                        Cancel
                    </button>
                    <button className='btn btn-danger' onClick={deleteCurrenteProduct}>
                        Delete
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default DeleteProductModal;
