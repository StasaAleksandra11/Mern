import { NavLink } from 'react-router-dom';
import { routesConfig } from '../../config/routesConfig';
import './Navigation.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrencyAction } from '../../store/currencySlice';
import { useEffect } from 'react';
import { toggleLoginFormAction } from '../../store/loginRegisterSlice';
import { localStorageConfig } from '../../config/localStorageConfig';

function Navigations() {

    const dispatch = useDispatch();
    const { currency, symbol } = useSelector((state) => state.currencyStore);
    const { isLoginForm } = useSelector((state) => state.loginRegisterStore);
    useEffect(()=> {
        localStorage.setItem(localStorageConfig.CURRENCY, currency)
    },[currency])

    const changeCurrency = (e) => {
        dispatch(setCurrencyAction(e.target.value));
    };
    const changeToggleView = () => {
      dispatch(toggleLoginFormAction(!isLoginForm))
    }
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
                                <option value='DIN'>DI</option>
                            </select>
                            <span> {symbol}</span>
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
                                    <NavLink to={routesConfig.AUTHORIZATION.url} onClick={changeToggleView}>{isLoginForm ? 'Register' : 'Login'}</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Navigations;
