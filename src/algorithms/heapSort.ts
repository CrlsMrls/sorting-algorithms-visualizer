import { TrackableArray } from '../simulations/trackableArray';
import { SortAlgorithm } from './';

function heapSortImplementation(array: TrackableArray): void {
    // heapify the array
    heapify(array);

    // for all elements swap greatest value with latest position and siftDown the value in first position
    for (let i = array.length - 1; i > 0; i--) {
        array.trackRange(0, i);

        // - swap first position with the last one
        array.swap(0, i);
        // - siftDown first element until i (already ordered)
        siftDown(array, 0, i - 1);
    }
}

// heapify. converts array in a heap
function heapify(array: TrackableArray): void {
    const lastPos = array.length - 1;
    const lastParent = parent(lastPos);
    // from end to start
    for (let i = lastParent; i >= 0; i--) {
        // - siftDown elements
        siftDown(array, i, lastPos);
    }
}

// siftDown. moves down element (from root) to correct position in heap (children are smaller) until end
function siftDown(array: TrackableArray, root: number, end: number): void {
    // while current position has at least a child
    while (leftChild(root) <= end) {
        // - move greater value (current position, and children) to top
        let greatestValue = root;
        if (array.isFirstGreater(leftChild(root), greatestValue)) {
            greatestValue = leftChild(root);
        }
        if (rightChild(root) <= end && array.isFirstGreater(rightChild(root), greatestValue)) {
            greatestValue = rightChild(root);
        }
        // - if no changes was needed (the current position is already greatest value) return
        if (greatestValue === root) {
            return;
        }
        // - otherwise swap and start again
        array.swap(root, greatestValue);
        root = greatestValue;
    }
}

function parent(pos: number): number {
    return Math.floor((pos - 1) / 2);
}

function leftChild(pos: number): number {
    return pos * 2 + 1;
}

function rightChild(pos: number): number {
    return pos * 2 + 2;
}

export const heapSort: SortAlgorithm = {
    name: 'Heap Sort',
    description: `
    <P>
    Heap sort is a stable O(n log n) sorting algorithm. 
    </P>
    <P>
    </P>
    <P>
    </P>
    <a target="wikipedia" href="https://en.wikipedia.org/wiki/Heapsort">Wikipedia link to Heap sort</a>`,
    sort: heapSortImplementation,
};
