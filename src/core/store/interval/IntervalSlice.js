import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    count: 0,
    intervalId: null
};

export const intervalSlice = createSlice({
    name: 'interval',
    initialState,
    reducers: {
        addCount: (state) => {
            state.count += 1;
        },
        resetCount: (state) => {
            state.count = 0;
        },
        setIntervalId: (state, action) => {
            state.intervalId = action.payload;
        }
    },
});

export const { addCount, resetCount, setIntervalId } = intervalSlice.actions;
export const selectInterval = (state) => state.interval;

export default intervalSlice.reducer;
