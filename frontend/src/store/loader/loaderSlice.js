import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        showLoader: false,
    },
    reducers: {
        showLoaderAction: (state, action) => {
            state.loader = action.payload;
        },
    },
});

export const { showLoaderAction } = loaderSlice.actions;
export default loaderSlice.reducer;
