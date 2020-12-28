import { TrackableArray } from '../simulations/trackableArray';
import { SortAlgorithm } from './';

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

    const middle = Math.floor((end + start) / 2);

    // pivot with the median of start, middle and end
    // 1. move the highest (from all 3) to end
    if (array.isFirstGreater(start, end - 1)) {
        array.swap(start, end - 1);
    }
    if (array.isFirstGreater(middle, end - 1)) {
        array.swap(middle, end - 1);
    }
    // 2. move the second highest (highest from the 2 smallest) to start
    if (array.isFirstGreater(middle, start)) {
        array.swap(middle, start);
    }

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

export const quickSortMedianPivot: SortAlgorithm = {
    name: 'Quick Sort - Median pivot',
    description: `
    <P>
    Quick sort is one of the most used sorting algorithms. Please refer to quick sort explanation.
    </P>
    <P>
    This implementation modifies the pivot selection to prevent O(n<sub>2</sub>) worst case scenarios in already sorted lists.
    For each iteration, the "median pivot" implementation selects the middle value of three elements (the left most, the middle and the right most element).
    </P>    
    <a target="wikipedia" href="https://en.wikipedia.org/wiki/Quicksort#Choice_of_pivot">Wikipedia link to Quick Sort</a>`,
    sort: quickSortImplementation,
};
