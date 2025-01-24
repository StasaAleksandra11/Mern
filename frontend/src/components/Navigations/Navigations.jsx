import { NavLink } from 'react-router-dom';
import { routesConfig } from '../../config/routesConfig';
import './Navigation.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrencyAction } from '../../store/currencySlice';
import { useEffect } from 'react';
function Navigations() {
    const dispatch = useDispatch();
    const { currency, symbol } = useSelector((state) => state.currencyStore);
     
    useEffect(()=> {
        localStorage.setItem('currency', currency)
    },[currency])

    const changeCurrency = (e) => {
        dispatch(setCurrencyAction(e.target.value));
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
                                    <NavLink to={routesConfig.AUTHORIZATION.url}>Authorization</NavLink>
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
