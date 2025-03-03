import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showLoaderAction } from '../../store/loader/loaderSlice';
import { changeCommmentStatus, deleteComment, getAllProduct } from '../../services/commentService';
import { formatDate } from '../../utils/formatDate';
import { toast } from 'react-toastify';

function Comments() {
    const dispatch = useDispatch();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComment = async () => {
            dispatch(showLoaderAction(true));
            const res = await getAllProduct();
            dispatch(showLoaderAction(false));
           
            if (res.status === 'success') {
                setComments(res.allComments);
            }
        };
        fetchComment();
    }, [dispatch]);

    const changeStatus = async (comment) => {
        const newStatus = !comment.status;
        dispatch(showLoaderAction(true));
        const res = await changeCommmentStatus(comment._id, newStatus);
        dispatch(showLoaderAction(false));
        if (res.status === 'success') {
            setComments((prevComments) => prevComments.map((c) => (c._id === comment._id ? { ...c, status: newStatus } : c)));
        }
    };

    const deleteOneComment = async (comment) => {
        dispatch(showLoaderAction(true));
        const res = await deleteComment(comment._id);
        dispatch(showLoaderAction(false));
        if (res.status === 'success') {
            toast.success(res.message);
            setComments((prevComments) => prevComments.filter((c) => c._id !== comment._id));
        }
    };

    const displayCommentView = () => {
        return comments.map((comment, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{comment.product_title}</td>
                    <td>{comment.author}</td>
                    <td>{comment.comment}</td>
                    <td>{formatDate(comment.date)}</td>
                    <td>
                        {comment.status ? (
                            <button className='btn btn-warning' onClick={() => changeStatus(comment)}>
                                Forbid
                            </button>
                        ) : (
                            <button className='btn btn-success' onClick={() => changeStatus(comment)}>
                                Approve
                            </button>
                        )}
                    </td>
                    <td>
                        <button className='btn btn-danger' onClick={() => deleteOneComment(comment)}>
                            Delete
                        </button>
                    </td>
                </tr>
            );
        });
    };

    return (
        <div className='table-comments'>
            <table className='table table-striped table-boarder table-hover table-dark'>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Content</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{comments && displayCommentView()}</tbody>
            </table>
        </div>
    );
}

export default Comments;
