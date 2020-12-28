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
    description: `
    <P>
    Quick sort is one of the most used sorting algorithms. There are multiple implementations, 
    this one is an unstable in-place O(n log n). 
    </P>
    <P>
    Quick sorts selects a pivot and partitions the array based on its value:
    all elements with lower values are moved before the pivot and all the others are moved after the pivot.
    After this partitioning, the pivot is in its final position. 
    Recursively apply the above steps to the sub-array of elements with smaller values and separately to the sub-array of elements with greater values.
    </P>
    <P>
    Selecting the pivot is crucial for the overall performance. This current implementation (as the original one) selects the left most element for each sublist.
    Unfortunately, this causes worst-case behavior on already sorted arrays, which is a rather common use-case.
    The "median pivot" implementation resolves that issue by selecting the middle value of three elements.
    </P>    
    <a target="wikipedia" href="https://en.wikipedia.org/wiki/Quick_sort">Wikipedia link to Quick Sort</a>`,
    sort: quickSortImplementation,
};
