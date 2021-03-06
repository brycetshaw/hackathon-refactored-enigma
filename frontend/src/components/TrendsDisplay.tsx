import React, { useEffect, useMemo, useState } from 'react';
import {
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ReferenceArea,
    ResponsiveContainer,
    Area,
    LineChart,
} from 'recharts';

import { useDispatch, useSelector } from 'react-redux';
import { Range, selectSelectedRange, setRange } from '../redux/paramsSlice';
import {Measurement, selectTrend, setPredict} from '../redux/trendsSlice';

import { arrayBetweenDates } from '../utils';
import dayjs from 'dayjs';
import {RootState} from "../redux/store";


export const TrendsDisplay = ():JSX.Element => {

   const arrayOfSeries = useSelector(selectTrend);
   const columns = useSelector((state: RootState) => state.params.columns.filter((col) => col.toggled).map(col=> col.id))

   const data = useMemo(() => {
       const map = new Map();

       arrayOfSeries.forEach((series) => {
           series.data.forEach((point) => {
               if(map.has(point.time)) {
                   map.set(point.time, {...map.get(point.time), [series.id]: point.value})
               } else {
                   map.set(point.time, { [series.id]: point.value})
               }
           })
       })
        return (Array.from(map.entries()).map(([key, value]) => ({...value, time: dayjs(key).valueOf()})))

   }, [arrayOfSeries])

    const selectedRange = useSelector(selectSelectedRange);
    const dispatch = useDispatch();


    const [left, right] = selectedRange.map((d) => dayjs(d).valueOf());

    const handleClick = (event: any) => {
        dispatch(setPredict(event.activeLabel))
    }
    return (
        <ResponsiveContainer width="97%" height="97%">
            <LineChart
                data={data}
                onClick={handleClick}

            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    allowDataOverflow={true}
                    dataKey="time"
                    domain={[left, right]}
                    tickFormatter={() => ''}
                    scale="time"
                    type="number"
                />
                <YAxis />
                <Tooltip
                    labelFormatter={(t) =>
                        dayjs(t).format('MMM D, YYYY h:mm A')
                    }
                />
                {
                    columns.map((label) => (
                        <Line
                            type="natural"
                            dataKey={label}
                            stroke="#3A395B"
                            dot={false}
                            isAnimationActive={false}
                        />
                    ))
                }
                {
                    <Line
                        type="natural"
                        dataKey={'prediction'}
                        stroke="#FF5733"
                        dot={false}
                        isAnimationActive={false}
                    />
                }
            </LineChart>
        </ResponsiveContainer>

    )
}
