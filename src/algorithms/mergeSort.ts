import { TrackableArray } from '../simulations/trackableArray';
import { SortAlgorithm } from './';

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
    description: `
    <P>
    Merge sort is a stable O(n log n) sorting algorithm. 
    </P>
    <P>
    Merge Sort divides the array into two sublits, until there is one single element, the base case that represents a sorted array of one element.
    Then it merges these sublists to produce new sorted sublists until the whole list is sorted.
    </P>
    <P>
    Merge sort is ideal for linked lists, for parallelization, in distributed systems and when the data to be sorted is too large to fit into memory. 
    </P>
    <P>
    As drawbacks, merge sort needs auxiliary space O(n), although there are in-place variants (e.g <a target="wikipedia" href="https://en.wikipedia.org/wiki/Block_sort">Block sort</a>).
    </P>
    <a target="wikipedia" href="https://en.wikipedia.org/wiki/Merge_sort">Wikipedia link to merge sort</a>`,
    sort: mergeSortImplementation,
};
