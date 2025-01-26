import Input from '../Input/Input';
import Label from '../Label/Label';
import './Register.scss';
import { FiEye } from 'react-icons/fi';
import { FaRegEyeSlash } from 'react-icons/fa6';

import { useState } from 'react';
import Button from '../Button/Button';
function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
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
    };

    return (
        <>
            {console.log(data, 'data')}
            <div className='register-wrapper'>
                <form onSubmit={handleSubmit}>
                    <div className='input-wrapper'>
                        <Label htmlFor='email'>Email</Label>
                        <Input type='text' id='email' placeholder='email@example.com' onChange={handleChange} />
                    </div>
                    <div className='input-wrapper'>
                        <Label htmlFor='password'>Password</Label>
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
