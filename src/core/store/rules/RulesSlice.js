import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    rule1: [0, 0, 1, 1, 0, 0, 0, 0, 0],
    rule0: [0, 0, 0, 1, 0, 0, 0, 0, 0],
};

export const rulesSlice = createSlice({
    name: 'rules',
    initialState,
    reducers: {
        changeRule1: (state, action) => {
            state.rule1[action.payload] === 1 ? state.rule1[action.payload] = 0 : state.rule1[action.payload] = 1;
        },
        changeRule0: (state, action) => {
            state.rule0[action.payload] === 1 ? state.rule0[action.payload] = 0 : state.rule0[action.payload] = 1;
        },
    },
});

export const { changeRule1, changeRule0 } = rulesSlice.actions;
export const selectRules = (state) => state.rules;

export default rulesSlice.reducer;
