import { configureStore } from '@reduxjs/toolkit';
import currencySlice from './currencySlice';
import loginRegisterSlice from './login/loginRegisterSlice';
import loaderSlice from './loader/loaderSlice';
export default configureStore({
    reducer: {
        currencyStore: currencySlice,
        loginRegisterStore: loginRegisterSlice,
        loaderStore  : loaderSlice
    
    },
});
