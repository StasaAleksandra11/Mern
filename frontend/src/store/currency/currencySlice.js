import { createSlice } from '@reduxjs/toolkit';

const getSymbol = () => {
    if (localStorage.currency === 'EUR') return '€';
    if (localStorage.currency === 'USD') return '$';
    if (localStorage.currency === 'DIN') return 'дин';
    return '€';
};

const currencySlice = createSlice({
    name: 'currency',
    initialState: {
        currency: localStorage.currency ? localStorage.currency : 'USD',
        symbol: getSymbol(),
    },
    reducers: {
        setCurrencyAction: (state, action) => {
            state.currency = action.payload;
            if(state.currency === 'EUR') state.symbol = '€'
            if(state.currency === 'USD') state.symbol = '$'
            if(state.currency === 'DIN') state.symbol = 'дин'
            console.log(state.currency, 'state.currency');
            console.log(state.symbol, 'state.symbol');
            
        },
    },
});
export const { setCurrencyAction } = currencySlice.actions;
export default currencySlice.reducer;
