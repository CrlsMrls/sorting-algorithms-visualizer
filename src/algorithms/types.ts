import { TrackableArray } from '../simulations/trackableArray';

export interface SortAlgorithm {
    name: string;
    description?: string;
    sort(array: TrackableArray): void;
}
