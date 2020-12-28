export function isArraySorted(array: number[]): boolean {
    for (let i = 1; i < array.length; i++) {
        // equal values are ok
        if (array[i - 1] > array[i]) {
            return false;
        }
    }
    return true;
}

export function createIncrementalArray(size: number): number[] {
    const array: number[] = [];

    for (let i = 0; i < size; i++) {
        // start at 1
        array[i] = i + 1;
    }

    return array;
}

export function shuffleArray(array: number[]): number[] {
    const clonedArray: number[] = [...array];

    for (let i = clonedArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [clonedArray[i], clonedArray[j]] = [clonedArray[j], clonedArray[i]];
    }

    return clonedArray;
}
