import { AppState } from './types';

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

export const initialState: AppState = {
    ui: {
        isSimulationPlaying: false,
        isArray: false,
        isInfoDialogOpen: false,
        isSettingsDialogOpen: false,
        showAlgorithmsResults: false,
        renderArray: [],
        reads: [],
        writes: [],
        start: 0,
        end: 0,
    },
    settings: {
        size: 50,
        includeReadsSteps: false,
        shuffleAtCreation: true,
    },
    data: {
        array: [],
        algorithmsResults: [],
        simulation: null,
        step: 0,
        speed: 500,
    },
};

export function cloneAppState(state: AppState): AppState {
    return {
        ui: {
            ...state.ui,
            renderArray: [...state.ui.renderArray],
            reads: [...state.ui.reads],
            writes: [...state.ui.writes],
        },
        settings: {
            ...state.settings,
        },
        data: {
            ...state.data,
            array: [...state.data.array],
            algorithmsResults: [...state.data.algorithmsResults],
            simulation: state.data.simulation, // TODO this should clone it
        },
    };
}
