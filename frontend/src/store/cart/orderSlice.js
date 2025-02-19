import { createSlice } from '@reduxjs/toolkit';

const orderSLice = createSlice({
    name: 'order',
    initialState: {
        currentStep: 1,
    },
    reducers: {
        handleCurrentStep: (state, action) => {
            state.currentStep = state.currentStep + action.payload;
        },
    },
});

export const { handleCurrentStep } = orderSLice.actions;
export default orderSLice.reducer;
