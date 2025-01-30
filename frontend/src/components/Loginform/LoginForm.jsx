import { FaArrowRight } from 'react-icons/fa6';
import './Login.scss';
import { useDispatch } from 'react-redux';
import { showRegisterForm } from '../../store/login/loginRegisterSlice';
import Label from '../Label/Label';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useState } from 'react';
import { chekEmailValidation } from '../../utils/chekEmailValidation';
function LoginForm() {
    const dispatch = useDispatch();
    const [isEmail, setIsEmail] = useState(true);
    const [isPassword, setIsPassword] = useState(true);
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        const newData = { ...data };
        newData[id] = value;
        setData(newData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        !data.email ? setIsEmail(false) : setIsEmail(true);
        !data.password ? setIsPassword(false) : setIsPassword(true);
        !chekEmailValidation(data.email) ? setIsEmail(false) : setIsEmail(true);

        if (!data.email || !data.password || !chekEmailValidation(data.email)) return;
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
                            <Label htmlFor='email' styleColor={isEmail}>
                                {isEmail ? 'Email' : 'Email is not valid'}
                            </Label>
                            <Input type='text' id='email' placeholder='email@example.com' onChange={handleChange} />
                        </div>
                        <div className='input-wrapper'>
                            <Label htmlFor='password' styleColor={isPassword}>
                                {isPassword ? 'Password' : 'Password is required'}
                            </Label>
                            <Input type='password' id='password' placeholder='Type your password' onChange={handleChange} />
                        </div>
                        <Button className='btn btn-primary' style={{ width: '100%' }}>
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginForm;
