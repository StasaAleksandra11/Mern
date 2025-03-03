import { useCallback, useEffect, useState } from 'react';
import Label from '../Label/Label';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { showLoaderAction } from '../../store/loader/loaderSlice';
import { addComment, getProductComments } from '../../services/commentService';
import { toast } from 'react-toastify';
import { formatDate } from '../../utils/formatDate';
import './LeaveComment.scss';
function LeaveComment({ product }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userStore);
    const [isComment, setIsComment] = useState(true);
    const [allComment, setAllComment] = useState([]);
    const [comment, setComment] = useState({
        comment: '',
    });

    useEffect(() => {
        {
            if (product && product._id && product.title) {
                setComment((prevComment) => ({
                    ...prevComment,
                    author: user?.username || 'Guest',
                    product_id: product._id,
                    product_title: product.title,
                }));
            }
        }
    }, [product, user]);

    const fetchComments = useCallback(async () => {
        dispatch(showLoaderAction(true));
        const res = await getProductComments(product._id);
        dispatch(showLoaderAction(false));
        if (res.status === 'success') {
            setAllComment(res.allComments.filter((comment) => comment.status));
        }
       
    }, [dispatch, product._id]);

    useEffect(() => {
        if (product && product._id) fetchComments();
    }, [product, product._id, fetchComments]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.comment) return setIsComment(false);
        setIsComment(true);
        dispatch(showLoaderAction(true));
        const res = await addComment(comment);
        dispatch(showLoaderAction(false));
        if (res.status === 'success') {
            setComment((prevComment) => ({
                ...prevComment,
                comment: '',
            }));
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    };

    return (
        <>
            <div className='col-6 my-5'>
                <h4>Leave Comment</h4>
                <form onSubmit={handleSubmit}>
                    <Label htmlFor='comment'>{isComment ? 'Comment' : 'Comment is required'}</Label>
                    <textarea
                        className='form-control'
                        id='comment'
                        maxLength='500'
                        value={comment.comment}
                        onChange={(e) => {
                            setComment((prevComment) => ({ ...prevComment, comment: e.target.value }));
                        }}
                    ></textarea>
                    <Button className='btn btn-primary my-3'>Submit Comment</Button>
                </form>
            </div>
            <h4>Comments({allComment.length})</h4>
            {allComment.length > 0
                ? allComment.map((comment, index) => {
                      return (
                          <div className='comment' key={index}>
                              <div className='comment-content'>
                                  <p>{comment.author}</p>
                                  <p className='comment-body'>{comment.comment}</p>
                              </div>
                              <p className='comment-date'>{formatDate(comment.date)}</p>
                          </div>
                      );
                  })
                : null}
        </>
    );
}

export default LeaveComment;
