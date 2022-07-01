import { configureStore } from '@reduxjs/toolkit';
import intervalReducer from './interval/IntervalSlice';
import rulesReducer from './rules/RulesSlice';

export const store = configureStore({
    reducer: {
        rules: rulesReducer,
        interval: intervalReducer
    },
});