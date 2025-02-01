import { configureStore } from '@reduxjs/toolkit';
import currencySlice from './currency/currencySlice';
import loginRegisterSlice from './login/loginRegisterSlice';
import loaderSlice from './loader/loaderSlice';
import userSlice from './user/userSlice'
export default configureStore({
    reducer: {
        currencyStore: currencySlice,
        loginRegisterStore: loginRegisterSlice,
        loaderStore  : loaderSlice,
        userStore : userSlice
       
    },
});
