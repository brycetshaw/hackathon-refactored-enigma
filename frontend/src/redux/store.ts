import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import paramsReducer from './paramsSlice';
import trendsReducer from "./trendsSlice";

export const store = configureStore({
    reducer: {
        params: paramsReducer,
        trends: trendsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;
