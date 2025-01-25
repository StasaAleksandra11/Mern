import { useSelector } from 'react-redux';
import LoginForm from '../../components/Navigations/Login form/LoginForm'
import RegisterForm from '../../components/Navigations/RegisterForm/RegisterForm';
function AuthorizationPage() {
    const { isLoginForm } = useSelector((state) => state.loginRegisterStore);

    return (
        <div className='container'>
            <div className='authorization-wrapper'>{isLoginForm ? <LoginForm/> : <RegisterForm/>}</div>
        </div>
    );
}

export default AuthorizationPage;
