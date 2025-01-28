import Input from '../Input/Input';
import Label from '../Label/Label';
import './Register.scss';
import { FiEye } from 'react-icons/fi';
import { FaRegEyeSlash } from 'react-icons/fa6';
import { useState } from 'react';
import Button from '../Button/Button';
import { chekEmailValidation } from '../../utils/chekEmailValidation';
import { register } from '../../services/userService';
import LoaderComponent from '../Loader/LoaderComponent';


function RegisterForm() {
    
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

    const [loader, setLoader] = useState(false)

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
        setLoader(true)
        const res = await register(data);
        setLoader(false)
        console.log(res, 'res iz servisa');
        if (res.status === 'success') {
            
            console.log('podaci');
        }
    };
     
    return (
        <>
            {loader ? <LoaderComponent/> : null}
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
                    <Button>Register</Button>
                </form>
            </div>
        </>
    );
}

export default RegisterForm;
