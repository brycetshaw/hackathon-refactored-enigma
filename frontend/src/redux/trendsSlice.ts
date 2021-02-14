import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';
// import { fetchSampledMinMaxRangeFromAPI } from '../lib/influxConnection';
import {Column, Range} from './paramsSlice';
import {getPrediction, getTrend} from "../lib/apiConnection";

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
    unit?: Unit;
    range?: Range;
    data: Measurement[];
    dataType?: DataType
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
            action: PayloadAction<Series>,
        ) => {

            const idx = state.data.findIndex((element) => element.id === action.payload.id)
            if(idx === -1) {
                state.data.push(action.payload)
            } else {
                state.data = state.data.map((series) => series.id === action.payload.id ? action.payload : series)
            }
        }
    },
});

export const { setData } = trendSlice.actions;

export const selectTrend = (state: RootState) => state.trends.data;

export const updateTrend = (columns: Column[], [start, end]: Range): AppThunk => (dispatch => {
    columns
        .forEach((column) => (
            getTrend(column.id, start, end)
                .then(res => (
                    dispatch(setData({id:column.id, data:res})
                    )
                )
                )
        )
    )
})

export const setPredict = (date: string): AppThunk => (dispatch => {
    getPrediction(date).then(res => (
        dispatch(setData({id: "prediction", data: res}))
    ))
})

// export const updateTrend = (range: Range, id: string): AppThunk => (dispatch) => {
//     if (range.includes(undefined)) return;
//
//
//
//
// };

export default trendSlice.reducer;
