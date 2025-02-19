import { createSlice } from '@reduxjs/toolkit';
import { localStorageConfig } from '../../config/localStorageConfig';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        isNewItem: false,
        isOldItem: false,
    },
    reducers: {
        addCart: (state, action) => {
            const addedItem = { ...action.payload };
            var doubledItemIndex;

            const doubleItem = state.cart.find((item, index) => {
                if (addedItem._id === item._id) {
                    doubledItemIndex = index;
                    return item;
                }
                return false;
            });
            console.log(doubledItemIndex, 'doubledIndex');

            if (!doubleItem) {
                addedItem.count = 1;
                addedItem.totalPrice = addedItem.price;
                state.cart.push(addedItem);
                state.isNewItem = true;
            } else {
                state.cart[doubledItemIndex].count++;
                state.cart[doubledItemIndex].totalPrice = state.cart[doubledItemIndex].price * state.cart[doubledItemIndex].count;
                state.isOldItem = true;
            }
        },
        handleCountItem: (state, action) => {
            const itemInfo = { ...action.payload };
            const count = itemInfo.isIncrease ? state.cart[itemInfo.index].count + 1 : state.cart[itemInfo.index].count - 1;
            state.cart[itemInfo.index].count = count < 1 ? 1 : count;
            state.cart[itemInfo.index].totalPrice = state.cart[itemInfo.index].price * state.cart[itemInfo.index].count;
            console.log(count, 'count');
        },
        removeItem: (state, action) => {
            state.cart.splice(action.payload, 1);
            if (!state.cart.length) localStorage.removeItem(localStorageConfig.CART);
        },
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        setNewOld: (state) => {
            state.isNewItem = false;
            state.isOldItem = false;
        },
    },
});

export const { addCart, handleCountItem, removeItem, setCart, setNewOld } = cartSlice.actions;
export default cartSlice.reducer;
