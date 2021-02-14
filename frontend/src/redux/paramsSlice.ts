import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';
import {isValidRange } from '../utils'
import dayjs, {Dayjs} from "dayjs";
import {getLabels} from "../lib/apiConnection";


export type Range = [string | undefined, string | undefined];

export interface ParamsState {
    selectedRange: Range;
    maxRange: Range;
    columns: string[];
}

const initialState: ParamsState = {
    selectedRange: [undefined, undefined],
    maxRange: [dayjs('01 May 2000').toISOString(), dayjs('30 September 2020').toISOString()],
    columns: []
};

export const paramsSlice = createSlice({
    name: 'params',
    initialState,
    reducers: {
        setMaxRange: (state, action: PayloadAction<Range>) => {
            state.maxRange = action.payload;
        },
        setRange: (state, action: PayloadAction<Range>) => {
            state.selectedRange = isValidRange(
                state.selectedRange,
                action.payload,
                state.maxRange,
            );
        },
        setLabels: (state, action: PayloadAction<string[]>) => {
           state.columns = action.payload;
        }
    },
});

export const { setMaxRange, setRange, setLabels } = paramsSlice.actions;
export const selectMaxRange = (state: RootState) => state.params.maxRange;
export const selectSelectedRange = (state: RootState) => state.params.selectedRange;

export const updateLabels = (): AppThunk => (dispatch => {
    console.log("hellooo")
    getLabels().then(res => {
        dispatch(setLabels(res));
    })
})

export default paramsSlice.reducer;
