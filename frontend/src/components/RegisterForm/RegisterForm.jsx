import Input from '../Input/Input';
import Label from '../Label/Label';
import './Register.scss';
import { FiEye } from 'react-icons/fi';
import { FaRegEyeSlash } from 'react-icons/fa6';
import { useState } from 'react';
import Button from '../Button/Button';
import { chekEmailValidation } from '../../utils/chekEmailValidation';
import { register } from '../../services/userService';

function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [isEmailFilled, setIsEmailFilled] = useState(true);
    const [isPasswordFilled, setIsPasswordFilled] = useState(true);
    const [isEmailValid, setIsEmailVallid] = useState(true);

    const handleChange = (e) => {
        const { id, value } = e.target;
        const newData = { ...data };
        newData[id] = value;
        setData(newData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        !data.email ? setIsEmailFilled(false) : setIsEmailFilled(true);
        !data.password ? setIsPasswordFilled(false) : setIsPasswordFilled(true);
        !chekEmailValidation(data.email) ? setIsEmailVallid(false) : setIsEmailVallid(true);

        if (!data.email || !data.password || !chekEmailValidation(data.email)) return;
        const res = await register(data)
    };

    return (
        <>
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
                        <Label htmlFor='password' styleColor={isPasswordFilled}>
                            {isPasswordFilled ? 'Password' : 'Password is required'}
                        </Label>
                        <Input type={showPassword ? 'text' : 'password'} id='password' placeholder='password' onChange={handleChange} />
                        <span onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FiEye /> : <FaRegEyeSlash />}</span>
                    </div>
                    <Button>Register</Button>
                </form>
            </div>
        </>
    );
}

export default RegisterForm;
