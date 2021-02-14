import { Range } from '../redux/paramsSlice';
import dayjs, { Dayjs } from 'dayjs';

import isBetween from 'dayjs/plugin/isBetween';
import {Measurement} from "../redux/trendsSlice";
dayjs.extend(isBetween);

type DayjsRange = [Dayjs, Dayjs] | undefined;

/**
 * Helper function to parse ISO date string [start, end] pairs to dayjs
 */
export const toDayjs = (range: Range): DayjsRange => {
        return range.map(dayjs) as DayjsRange;
};

/**
 * Transforms Range to be larger, but does not exceed the limit Range.
 * @param original
 * @param limits
 * @param expandBy
 */
export const expandWindow = (
    original: Range,
    limits: Range,
    expandBy: number,
): Range => {
    const [start, end]: Dayjs[] = toDayjs(original) as Dayjs[];
    const [min, max]: Dayjs[] = toDayjs(limits) as Dayjs[];
    const window = end.diff(start);

    const calculateExpandedRange = () => [
        start.subtract(expandBy * window),
        end.add(window * expandBy),
    ];

    const calculateBoundedRange = ([expandedStart, expandedEnd]: Dayjs[]) => [
        expandedStart.isBefore(min) ? min : expandedStart,
        expandedEnd.isAfter(max) ? max : expandedEnd,
    ];
    const toISOString = (val: Dayjs) => val.toISOString();

    return calculateBoundedRange(calculateExpandedRange()).map(
        toISOString,
    ) as Range;
};

export const isSameRange = (a: Range, b: Range): boolean | undefined => {
    const mapToValue = (a: Range) => a.map((d) => dayjs(d).valueOf());
    return mapToValue(a).join() === mapToValue(b).join();
};

/**
 * This is a checker to make sure that the next state of the range is valid,
 * if it isn't, it will return an appropriate range.
 *
 * @param current
 * @param next
 * @param limit
 */
export const isValidRange = (current: Range, next: Range, limit: Range) => {
    const nextRange = toDayjs(next);
    if (nextRange === undefined) return current;
    const [start, end] = nextRange;
    if (start && end && start < end) {
        if (end.diff(start) < 1000000) {
            return expandWindow(next, limit, 5);
        }
        return expandWindow(next, limit, 0);
    } else {
        return expandWindow(next.reverse() as Range, limit, 0);
    }
};



export const arrayBetweenDates = (
    data: Measurement[],
    lowerBound: string,
    upperBound: string,
) => {
    return data.filter((val) =>
        dayjs(val.time).isBetween(lowerBound, upperBound),
    );
};


