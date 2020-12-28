import { TrackableArray } from '../simulations/trackableArray';
import { SortAlgorithm } from './';

function selectionSortImplementation(array: TrackableArray): void {
    for (let i = 0; i < array.length; i++) {
        let minPos = i;

        for (let j = i + 1; j < array.length; j++) {
            // compare all remaining values and take the smallest one
            if (array.isFirstGreater(minPos, j)) {
                minPos = j;
            }
        }
        // swap current position and the minimal value after that position
        if (i !== minPos) {
            array.swap(i, minPos);
        }
    }
}

export const selectionSort: SortAlgorithm = {
    name: 'Selection Sort',
    description: `
    <P>
    Selection sort is an in-place comparison sorting algorithm. 
    It has an O(n<sup>2</sup>) time complexity, the slowest algorithm in the list. 
    </P>
    <P>
    It sorts an array by repeatedly finding the minimum element and putting it at the beginning.    
    In every iteration of selection sort, the minimum element (considering ascending order) from the unsorted subarray is picked and moved to the sorted subarray.
    </P>
    <P>
    On the contrary, this algorithm performs n-1 swaps at the worst case. Making it ideal when writes are expensive.
    </P>    
    <a target="wikipedia" href="https://en.wikipedia.org/wiki/Selection_sort">Wikipedia link to selection Sort</a>`,
    sort: selectionSortImplementation,
};
