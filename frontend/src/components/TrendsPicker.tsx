import React from "react";
import {
    selectMaxRange,
    selectSelectedRange,
    setRange,
} from '../redux/paramsSlice'


// workaround to replace moment.js with day.js
// (https://ant.design/docs/react/replace-moment)
import dayjs, { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style/index';
import {useDispatch, useSelector} from "react-redux";
import {toDayjs} from "../utils";
import {RootState} from "../redux/store";
import {Checkbox} from "antd";
const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);
const { RangePicker } = DatePicker;
// Weird hack ends.


export const TrendsPicker = (): JSX.Element => {

    const maxRange = useSelector(selectMaxRange);
    const columns = useSelector((state: RootState) => state.params.columns);

    const selectedRange = useSelector(selectSelectedRange);
    const dispatch = useDispatch();

    const handleChange = (e: any) => {
        const updatedRange = e.map((d: any) => dayjs(d).toISOString());
        dispatch(setRange(updatedRange));
    };

    const dateIsDisabled = (date: Dayjs): boolean => {
        if ([...maxRange].includes(undefined)) return false;

        const [start, end] = toDayjs(maxRange);
        return (date && date < start) || date > end;
    };

    return (
        <div>
        <RangePicker
            value={toDayjs(selectedRange)}
            onChange={handleChange}
            disabledDate={dateIsDisabled}
        />
    {
       columns.map((label) => (
           <Checkbox>
               {label}
           </Checkbox>
       ))
    }
        </div>
    )
}

