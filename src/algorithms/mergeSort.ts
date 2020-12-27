import { TrackableArray } from '../simulations/trackableArray';
import { SortAlgorithm } from './types';

function sort(array: TrackableArray, start: number, end: number, work: number[]): void {
    array.trackRecursiveCall();

    if (start + 1 >= end) {
        return;
    }

    const half = Math.floor((start + end) / 2);
    sort(array, start, half, work);
    sort(array, half, end, work);

    merge(array, start, half, end, work);
    array.trackReturned();
}

function merge(
    array: TrackableArray,
    start: number,
    half: number,
    end: number,
    work: number[]
): void {
    array.trackRange(start, end);

    let i = start;
    let j = half;
    let k = start;

    while (i < half && j < end) {
        if (!array.isFirstGreater(i, j)) {
            work[k] = array.get(i);
            array.increaseWrites();
            i++;
        } else {
            work[k] = array.get(j);
            array.increaseWrites();
            j++;
        }
        k++;
    }
    while (i < half) {
        array.increaseWrites();
        work[k++] = array.get(i++);
    }
    while (j < end) {
        array.increaseWrites();
        work[k++] = array.get(j++);
    }

    for (k = start; k < end; k++) {
        array.increaseReads();
        array.set(k, work[k]);
    }
}

function mergeSortImplementation(array: TrackableArray): void {
    sort(array, 0, array.length, new Array(array.length));
}

export const mergeSort: SortAlgorithm = {
    name: 'Merge Sort',
    description: `some description <a href="">link</a>`,
    sort: mergeSortImplementation,
};
