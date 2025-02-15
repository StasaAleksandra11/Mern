import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
    },
    reducers: {
        addCart: (state, action) => {
          const addedItem = action.payload
          
          const doubleItem = state.cart.find((item, index) => {
            if(addedItem._id === item._id) return item;
            return false;
          }) 

          if(!doubleItem){

           state.cart.push(action.payload)
          }

          
        },
    },
});

export const { addCart } = cartSlice.actions;
export default cartSlice.reducer;
