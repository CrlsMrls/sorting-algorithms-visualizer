import { TrackableArray } from '../simulations/trackableArray';
import { SortAlgorithm } from './types';

function quicksort(array: TrackableArray, start: number, end: number): void {
    array.trackRecursiveCall();

    if (start >= end) {
        return;
    }

    const pivot = partition(array, start, end);
    quicksort(array, start, pivot);
    quicksort(array, pivot + 1, end);

    array.trackReturned();
}

function partition(array: TrackableArray, start: number, end: number): number {
    array.trackRange(start, end);
    let i = start + 1;

    for (let j = i; j < end; j++) {
        if (array.isFirstGreater(start, j)) {
            array.swap(i, j);
            i++;
        }
    }
    i--;
    array.swap(start, i);

    return i;
}

function quickSortImplementation(array: TrackableArray): void {
    quicksort(array, 0, array.length);
}

export const quickSort: SortAlgorithm = {
    name: 'Quick Sort',
    description: `some description <a href="">link</a>`,
    sort: quickSortImplementation,
};
