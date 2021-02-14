import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';
import {isValidRange } from '../utils'
import dayjs, {Dayjs} from "dayjs";
import {getLabels} from "../lib/apiConnection";


export type Range = [string, string ];

export interface Column {
    id: string;
    toggled: boolean;
}

export interface ParamsState {
    selectedRange: Range;
    maxRange: Range;
    columns: Column[];
}

const initialState: ParamsState = {
    selectedRange: [dayjs('01 May 2002').toISOString(), dayjs('15 May 2002').toISOString()],
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
           state.columns = action.payload.map((id) => ({id, toggled: true}));
        },
        toggleLabel: (state, action: PayloadAction<string>) => {
            state.columns = state.columns.map((obj) => obj.id === action.payload ? {...obj, toggled: !obj.toggled} : obj)
        }
    },
});

export const { setMaxRange, setRange, setLabels, toggleLabel } = paramsSlice.actions;
export const selectMaxRange = (state: RootState) => state.params.maxRange;
export const selectSelectedRange = (state: RootState) => state.params.selectedRange;

export const updateLabels = (): AppThunk => (dispatch => {
    getLabels().then(res => {
        dispatch(setLabels(res));
    })
})

export default paramsSlice.reducer;
