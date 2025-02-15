import { NavLink, useNavigate } from 'react-router-dom';
import { routesConfig } from '../../config/routesConfig';
import './Navigation.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrencyAction } from '../../store/currency/currencySlice';
import { useEffect } from 'react';
import { toggleLoginFormAction } from '../../store/login/loginRegisterSlice';
import { localStorageConfig } from '../../config/localStorageConfig';
import { IoIosArrowDown } from 'react-icons/io';
import { removeUserAction } from '../../store/user/userSlice';
import ShopCart from '../ShopCart/ShopCart';

function Navigations() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currency, symbol } = useSelector((state) => state.currencyStore);
    const { isLoginForm } = useSelector((state) => state.loginRegisterStore);
    const { user } = useSelector((state) => state.userStore);
    useEffect(() => {
        localStorage.setItem(localStorageConfig.CURRENCY, currency);
    }, [currency]);

    const changeCurrency = (e) => {
        dispatch(setCurrencyAction(e.target.value));
    };
    const changeToggleView = () => {
        dispatch(toggleLoginFormAction(!isLoginForm));
    };

    const userLogout = () => {
        localStorage.removeItem(localStorageConfig.USER);
        dispatch(removeUserAction());
        navigate(routesConfig.AUTHORIZATION.url);
    };

  

    const NavigationView = () => {
        return localStorage.getItem(localStorageConfig.USER) ? (
            <div className='dropdown'>
                <li className='dopbtn'>
                    <a>{user.username}</a>
                    <IoIosArrowDown />
                    <div className='dropdown-content'>
                        <li>
                            <NavLink>Profile</NavLink>
                        </li>
                        {user.role === 'admin' && <li>
                            <NavLink to={routesConfig.DASHBOARD.url }>Dashboard</NavLink>
                            </li>}
                        <li onClick={userLogout}>
                            <a>Logout</a>
                        </li>
                    </div>
                </li>
            </div>
        ) : (
            <>
                {' '}
                <li>
                    <NavLink to={routesConfig.AUTHORIZATION.url} onClick={changeToggleView}>
                        {isLoginForm ? 'Register' : 'Login'}
                    </NavLink>
                </li>
            </>
        );
    };

    return (
        <>
            <header>
                <div className='container'>
                    <div className='navigation-wrapper'>
                        <div className='currency'>
                            <label htmlFor='currency'>currency</label>
                            <select name='currency' id='currency' defaultValue={currency} onChange={changeCurrency}>
                                <option value='EUR'>EUR</option>
                                <option value='USD'>USD</option>
                                <option value='DIN'>DIN</option>
                            </select>
                        </div>
                        <div className='navigation'>
                            <ul>
                                <li>
                                    <NavLink to={routesConfig.SHOP.url}>Shop</NavLink>
                                </li>
                                <li>
                                    <NavLink to={routesConfig.CONTACT.url}>Contact</NavLink>
                                </li>
                                <li>
                                    <ShopCart/>
                                </li>
                                {NavigationView()}
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Navigations;
