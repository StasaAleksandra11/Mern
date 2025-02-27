import { FaArrowRight } from 'react-icons/fa6';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showRegisterForm } from '../../store/login/loginRegisterSlice';
import Label from '../Label/Label';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useState } from 'react';
import { chekEmailValidation } from '../../utils/chekEmailValidation';
import { FaRegEyeSlash } from 'react-icons/fa6';
import { FiEye } from 'react-icons/fi';
import { login } from '../../services/userService';
import { showLoaderAction } from '../../store/loader/loaderSlice';
import { toast } from 'react-toastify';
import { routesConfig } from '../../config/routesConfig';
import { localStorageConfig } from '../../config/localStorageConfig';
import { setUserAction } from '../../store/user/userSlice';
function LoginForm() {
    const dispatch = useDispatch();
    const [isEmail, setIsEmail] = useState(true);
    const [isPassword, setIsPassword] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { id, value } = e.target;
        const newData = { ...data };
        newData[id] = value;
        setData(newData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        !data.email ? setIsEmail(false) : setIsEmail(true);
        !data.password ? setIsPassword(false) : setIsPassword(true);
        !chekEmailValidation(data.email) ? setIsEmailValid(false) : setIsEmail(true);

        if (!data.email || !data.password || !chekEmailValidation(data.email)) return;
        dispatch(showLoaderAction(true));
        const res = await login(data);
        dispatch(showLoaderAction(false));
        console.log(res, 'res sa fronta');
        
        if (res.status === 'success') {
            localStorage.setItem(localStorageConfig.USER, JSON.stringify(res.user));
            localStorage.setItem(localStorageConfig.TOKEN, res.token);
            dispatch(setUserAction(res.user));
            navigate(routesConfig.SHOP.url);
        } else {
            toast.error(res.message);
        }
    };

    return (
        <>
            <div className='login-form-wrapper'>
                <div className='content'>
                    <h3>We are glad to see you again :)</h3>
                    <p>
                        You dont have account?{' '}
                        <span onClick={() => dispatch(showRegisterForm())}>
                            Go to Register <FaArrowRight />
                        </span>
                    </p>
                </div>
                <div className='login-wrapper'>
                    <form onSubmit={handleSubmit}>
                        <div className='input-wrapper'>
                            <Label htmlFor='email' styleColor={isEmail ? isEmailValid : isEmail}>
                                {isEmail ? (isEmailValid ? 'Email' : 'Email is not valid') : 'Email is required'}
                            </Label>
                            <Input type='text' id='email' placeholder='email@example.com' onChange={handleChange} />
                        </div>
                        <div className='input-wrapper'>
                            <Label htmlFor='password' styleColor={isPassword}>
                                {isPassword ? 'Password' : 'Password is required'}
                            </Label>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                placeholder='Type your password'
                                onChange={handleChange}
                            />
                            <span onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FiEye /> : <FaRegEyeSlash />}</span>
                        </div>
                        <Button className='btn btn-success' style={{ width: '100%' }}>
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginForm;
