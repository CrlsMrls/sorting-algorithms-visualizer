import { shuffleArray, createIncrementalArray, isArraySorted } from './utils';

describe('createIncrementalArray', () => {
    test('creation 10 items', () => {
        const array: number[] = createIncrementalArray(10);
        for (let i = 0; i < 10; i++) {
            // starts at 1
            expect(array[i]).toEqual(i + 1);
        }
    });
    test('size is specified at creation', () => {
        let array: number[] = createIncrementalArray(10);
        expect(array.length).toEqual(10);
        array = createIncrementalArray(100);
        expect(array.length).toEqual(100);
    });
});

describe('isArraySorted', () => {
    test('returns true with sorted items', () => {
        const array: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        expect(isArraySorted(array)).toEqual(true);
        // turn false by adding a non ordered element
        array.push(1);
        expect(isArraySorted(array)).toEqual(false);
    });

    test('returns false with unsorted items', () => {
        const array: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        expect(isArraySorted(array)).toEqual(false);
        // turn true by removing last element
        expect(isArraySorted(array.splice(-1))).toEqual(true);
    });

    test('returns true with repeated and incremental items', () => {
        const array: number[] = [1, 1, 2, 2, 3, 3, 7, 8, 9];
        expect(isArraySorted(array)).toEqual(true);
    });

    test('returns true with createIncrementalArray', () => {
        const array: number[] = createIncrementalArray(10);
        expect(isArraySorted(array)).toEqual(true);
    });
});

describe('shuffleArray', () => {
    test('changes order of items', () => {
        const array: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const shuffled: number[] = shuffleArray(array);

        expect(isArraySorted(array)).toEqual(true);
        expect(isArraySorted(shuffled)).toEqual(false);
    });
    test('keeps the same items', () => {
        const array: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const shuffled: number[] = shuffleArray(array);

        expect(shuffled.length).toEqual(array.length);
        expect(new Set(shuffled).size).toEqual(new Set(array).size);
    });
});
