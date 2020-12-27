import { TrackableArray } from '../../simulations/trackableArray';

export function isSorted(array: number[]): boolean {
    for (let i = 1; i < array.length; i++) {
        if (array[i - 1] >= array[i]) {
            return false;
        }
    }
    return true;
}

export function expectNotSorted(array: TrackableArray) {
    expect(isSorted(array.cloneArray())).toBeFalsy();
}

export function expectSorted(array: TrackableArray) {
    expect(isSorted(array.cloneArray())).toBeTruthy();
}
