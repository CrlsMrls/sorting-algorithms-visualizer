import { SortAlgorithm } from './types';

import { mergeSort } from './mergeSort';
import { quickSort } from './quickSort';
import { quickSortMedianPivot } from './quickSortMedianPivot';

export const algorithms: SortAlgorithm[] = [mergeSort, quickSort, quickSortMedianPivot];
export * from './types';
