import { SortAlgorithm, algorithms } from '.';
import { TrackableArray } from '../simulations/trackableArray';
import { shuffleArray, createIncrementalArray, isArraySorted } from '../utils';

// const concreteAlgorithms: SortAlgorithm[] = [mergeSort, quickSort, quickSortMedianPivot];

algorithms.forEach((algorithm: SortAlgorithm) => {
    describe(`Sort algorithm: ${algorithm.name}`, () => {
        test('concrete array', () => {
            const array = new TrackableArray([1, 3, 4, 2, 0]);

            expectNotSorted(array);
            algorithm.sort(array);
            expectSorted(array);
        });

        test('already sorted array', () => {
            const array = new TrackableArray([0, 1, 2, 3, 4, 5, 6]);

            expectSorted(array);
            algorithm.sort(array);
            expectSorted(array);
        });

        test('repeated and non consecutive items', () => {
            const rawArray = [19, 30, 4, 20, 0, 15, 5, 16, 9, 1, 10, 12, 11, 1, 7, 8, 13, 14, 6];
            const array = new TrackableArray(rawArray);

            expectNotSorted(array);
            algorithm.sort(array);
            expectSorted(array);
        });

        test('sort random big array', () => {
            const randomArray = shuffleArray(createIncrementalArray(10000));
            const array = new TrackableArray(randomArray);

            expectNotSorted(array);
            algorithm.sort(array);
            expectSorted(array);
        });
    });
});

function expectNotSorted(array: TrackableArray) {
    expect(isArraySorted(array.cloneArray())).toBeFalsy();
}

function expectSorted(array: TrackableArray) {
    expect(isArraySorted(array.cloneArray())).toBeTruthy();
}
