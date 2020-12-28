import { TrackableArray } from '../simulations/trackableArray';

import { mergeSort } from './mergeSort';
import { quickSort } from './quickSort';
import { quickSortMedianPivot } from './quickSortMedianPivot';
import { selectionSort } from './selectionSort';

export const algorithms: SortAlgorithm[] = [
    mergeSort,
    quickSort,
    quickSortMedianPivot,
    selectionSort,
];
export interface SortAlgorithm {
    name: string;
    description?: string;
    sort(array: TrackableArray): void;
}
