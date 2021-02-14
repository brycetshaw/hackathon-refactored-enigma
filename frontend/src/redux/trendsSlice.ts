import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';
// import { fetchSampledMinMaxRangeFromAPI } from '../lib/influxConnection';
import { Range } from './paramsSlice';

export enum Unit {
    flow = 'm3/s',
    snow = 'm',
    precip = 'mm',
}

export interface Measurement {
    time: string;
    value: number
}

export enum DataType {
    actual,
    inference
}

export interface Series {
    id: string;
    unit: Unit;
    range: Range;
    data: Measurement[];
    dataType: DataType
}

interface TrendState {
    data: Series[];
}

const initialState: TrendState = {
    data: [],
};

export const trendSlice = createSlice({
    name: 'trend',
    initialState,
    reducers: {
        setData: (
            state,
            action: PayloadAction<{ id: string } & TrendState>,
        ) => {

        }
    },
});

export const { setData } = trendSlice.actions;

export const selectTrend = (state: RootState) => state.trends.data;

// export const updateTrend = (range: Range, id: string): AppThunk => (dispatch) => {
//     if (range.includes(undefined)) return;
//
//
//
//
// };

export default trendSlice.reducer;
