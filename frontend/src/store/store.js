import { configureStore } from '@reduxjs/toolkit';
import currencySlice from './currencySlice';
import loginRegisterSlice from './loginRegisterSlice'
export default configureStore({
    reducer: {
        currencyStore: currencySlice,
        loginRegisterStore: loginRegisterSlice
    
    },
});
