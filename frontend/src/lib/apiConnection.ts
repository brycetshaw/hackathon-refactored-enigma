import dayjs from "dayjs";
import {Measurement} from "../redux/trendsSlice";

const rootUrl =
    process.env.NODE_ENV === 'production'
        ? `${process.env.PUBLIC_URL}/api`
        : 'http://localhost:4000';

export const getLabels = async () => {
    console.log("heloooooo")
    const res = await fetch(`${rootUrl}/features/`);
    return res.json();
}

export const getTrend = async (id: string, start: string, end: string): Promise<Measurement[]> => {
    const res = await fetch(`${rootUrl}/query/?feature=${id}&start_date=${dayjs(start).unix()}&end_date=${dayjs(end).unix()}`);
    const result = await res.json()
    return Object.entries(result).map((val): Measurement => ({time: val[0], value: Number(val[1])}))
}

export const getPrediction = async (date: string): Promise<Measurement[]> => {

    const res = await fetch(`${rootUrl}/predict/?date=${dayjs(date).unix()}`)
    const result = await res.json();
    const transformed = await Array.from(Object.entries(result))
    const more = transformed[0][1]
    return Object.entries(more as Object).map((val): Measurement => ({time: val[0], value: Number(val[1])}))
}