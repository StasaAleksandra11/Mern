import Input from '../Input/Input';
import Label from '../Label/Label';
import './Register.scss';
import { FiEye } from 'react-icons/fi';
import { FaRegEyeSlash } from 'react-icons/fa6';
import { useState } from 'react';
import Button from '../Button/Button';
import { chekEmailValidation } from '../../utils/chekEmailValidation';
import { register } from '../../services/userService';
import { useDispatch } from 'react-redux';
// import LoaderComponent from '../Loader/LoaderComponent';
import { showLoaderAction } from '../../store/loader/loaderSlice';
import { toast } from 'react-toastify';
import { showLoginForm } from '../../store/login/loginRegisterSlice';
import { FaArrowRight } from 'react-icons/fa6';

function RegisterForm() {
    const dispatch = useDispatch();

    const [isEmailFilled, setIsEmailFilled] = useState(true);
    const [isEmailValid, setIsEmailVallid] = useState(true);
    const [isUsername, setIsUsername] = useState(true);
    const [isPasswordFilled, setIsPasswordFilled] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: '',
        username: '',
        password: '',
    });

    // const [loader, setLoader] = useState(false)

    const handleChange = (e) => {
        const { id, value } = e.target;
        const newData = { ...data };
        newData[id] = value;
        setData(newData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        !data.email ? setIsEmailFilled(false) : setIsEmailFilled(true);
        !data.username ? setIsUsername(false) : setIsUsername(true);
        !data.password ? setIsPasswordFilled(false) : setIsPasswordFilled(true);
        !chekEmailValidation(data.email) ? setIsEmailVallid(false) : setIsEmailVallid(true);

        if (!data.email || !data.username || !data.password || !chekEmailValidation(data.email)) return;

        dispatch(showLoaderAction(true));
        // setLoader(true)
        const res = await register(data);
        dispatch(showLoaderAction(false));
        // setLoader(false)
        if (res.status === 'success') {
            toast.success(res.message);
            dispatch(showLoginForm());
        } else {
            toast.error(res.message);
        }
    };

    return (
        <>
            <div className='register-form-wrapper'>
                <div className='content'>
                    <h3>Welcome to TechMern Shop </h3>
                    <p>
                        if alredy have account please{' '}
                        <span onClick={() => dispatch(showLoginForm())}>
                            Go to Login <FaArrowRight />{' '}
                        </span>
                    </p>
                </div>

                {console.log(data, 'data')}
                <div className='register-wrapper'>
                    <form onSubmit={handleSubmit}>
                        <div className='input-wrapper'>
                            <Label htmlFor='email' styleColor={isEmailFilled ? isEmailValid : isEmailFilled}>
                                {isEmailFilled ? (isEmailValid ? 'Email' : 'Email is not valid') : 'Email is required'}
                            </Label>
                            <Input type='text' id='email' placeholder='email@example.com' onChange={handleChange} />
                        </div>
                        <div className='input-wrapper'>
                            <Label htmlFor='username' styleColor={isUsername}>
                                {isUsername ? 'Username' : 'Username is required'}
                            </Label>
                            <Input type='text' id='username' placeholder='check your username' onChange={handleChange} />
                        </div>
                        <div className='input-wrapper'>
                            <Label htmlFor='password' styleColor={isPasswordFilled}>
                                {isPasswordFilled ? 'Password' : 'Password is required'}
                            </Label>
                            <Input type={showPassword ? 'text' : 'password'} id='password' placeholder='password' onChange={handleChange} />
                            <span onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FiEye /> : <FaRegEyeSlash />}</span>
                        </div>
                        <Button className='btn btn-primary' style={{width: "100%"}}>Register</Button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default RegisterForm;
