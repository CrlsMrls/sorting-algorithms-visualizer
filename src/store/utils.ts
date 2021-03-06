import { AppState } from './types';

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
        includeReadsSteps: true,
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
