import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
    name: 'dashboard',

    initialState: {
        isDashboard: false,
    },
    reducers: {
        isDashboardAction: (state, action) => {
            state.isDashboard = action.payload;
        },
    },
});

export const { isDashboardAction } = dashboardSlice.actions;
export default dashboardSlice.reducer;
