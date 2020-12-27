import { mergeSort } from '../mergeSort';
import { createIncrementalArray, shuffleArray } from '../../store/utils';
import { TrackableArray } from '../../simulations/trackableArray';
import { expectNotSorted, expectSorted } from './testUtils';

class MockObject {}

describe('mergeSort', () => {
    test('concrete array', () => {
        const array = new TrackableArray([1, 3, 4, 2, 0]);

        expectNotSorted(array);
        mergeSort.sort(array);
        expectSorted(array);
    });

    test('sort random big array', () => {
        const randomArray = shuffleArray(createIncrementalArray(1000));
        const array = new TrackableArray(randomArray);

        expectNotSorted(array);
        mergeSort.sort(array);
        expectSorted(array);
    });
});
