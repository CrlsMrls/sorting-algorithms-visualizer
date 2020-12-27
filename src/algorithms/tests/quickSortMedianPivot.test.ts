import { quickSortMedianPivot } from '../quickSortMedianPivot';
import { createIncrementalArray, shuffleArray } from '../../store/utils';
import { TrackableArray } from '../../simulations/trackableArray';
import { expectNotSorted, expectSorted } from './testUtils';

class MockObject {}

describe('quickSort', () => {
    test('concrete array', () => {
        const array = new TrackableArray([1, 3, 4, 2, 0]);

        expectNotSorted(array);
        quickSortMedianPivot.sort(array);
        expectSorted(array);
    });

    test('sort random big array', () => {
        const randomArray = shuffleArray(createIncrementalArray(1000));

        const array = new TrackableArray(randomArray);

        expectNotSorted(array);
        quickSortMedianPivot.sort(array);
        expectSorted(array);
    });
});
