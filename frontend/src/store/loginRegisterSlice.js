import { createSlice } from '@reduxjs/toolkit';

const loginRegisterSlice = createSlice({
    name: 'login-register',
    initialState: {
        isLoginForm: false,
    },
    reducers: {
        toggleLoginFormAction: (state, action) => {
            state.isLoginForm = action.payload;
        },
    },
});

export const { toggleLoginFormAction } = loginRegisterSlice.actions;
export default loginRegisterSlice.reducer;
