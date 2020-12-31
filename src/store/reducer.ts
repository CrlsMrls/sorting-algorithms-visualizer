import {
    ActionTypes,
    AppState,
    CREATE_ARRAY,
    RUN_SIMULATION,
    SHOW_INFO_DIALOG,
    CLOSE_INFO_DIALOG,
    PLAY_PAUSE_SIMULATION,
    GOTO_SIMULATION_STEP,
    CHANGE_SLIDER,
    SHOW_SETTINGS_DIALOG,
    CLOSE_SETTINGS_DIALOG,
    CONFIRM_SETTINGS_DIALOG,
} from './types';
import { initialState, cloneAppState } from './utils';
import { createIncrementalArray, shuffleArray } from '../utils';

import { algorithms, SortAlgorithm } from '../algorithms';
import { TrackableArray } from '../simulations/trackableArray';
import { Simulation } from '../simulations/simulation';

export function rootReducer(state: AppState = initialState, action: ActionTypes): AppState {
    switch (action.type) {
        case CREATE_ARRAY: {
            let array: number[] = createIncrementalArray(state.settings.size);

            if (state.settings.shuffleAtCreation) {
                array = shuffleArray(array);
            }

            const clonedState: AppState = cloneAppState(state);
            clonedState.data.array = array;
            clonedState.data.algorithmsResults = [];

            clonedState.ui.isArray = true;
            clonedState.ui.renderArray = [...array];
            clonedState.ui.reads = [];
            clonedState.ui.writes = [];
            clonedState.ui.start = 0;
            clonedState.ui.end = 0;

            clonedState.data.simulation = null;
            clonedState.data.step = 0;

            clonedState.data.algorithmsResults = [];

            algorithms.forEach((algorithm: SortAlgorithm) => {
                const array: TrackableArray = new TrackableArray(clonedState.data.array);
                algorithm.sort(array);
                clonedState.data.algorithmsResults.push(array);
            });
            clonedState.ui.showAlgorithmsResults = true;
            clonedState.ui.isSimulationPlaying = false;

            return clonedState;
        }
        case SHOW_INFO_DIALOG: {
            const clonedState: AppState = cloneAppState(state);

            clonedState.ui.isInfoDialogOpen = true;
            clonedState.ui.infoName = action.payload.name;
            clonedState.ui.infoDescription = action.payload.description;

            return clonedState;
        }
        case CLOSE_INFO_DIALOG: {
            const clonedState: AppState = cloneAppState(state);

            clonedState.ui.isInfoDialogOpen = false;

            return clonedState;
        }
        case SHOW_SETTINGS_DIALOG: {
            const clonedState: AppState = cloneAppState(state);

            clonedState.ui.isSettingsDialogOpen = true;
            clonedState.ui.isSimulationPlaying = false;

            return clonedState;
        }
        case CLOSE_SETTINGS_DIALOG: {
            const clonedState: AppState = cloneAppState(state);

            clonedState.ui.isSettingsDialogOpen = false;

            return clonedState;
        }
        case CONFIRM_SETTINGS_DIALOG: {
            const clonedState: AppState = cloneAppState(state);

            clonedState.ui.isSettingsDialogOpen = false;
            clonedState.settings = action.payload;

            return clonedState;
        }

        case RUN_SIMULATION: {
            const clonedState: AppState = cloneAppState(state);
            const selectedAlgorithm: SortAlgorithm = algorithms[action.payload];

            const simulation: Simulation = new Simulation(
                clonedState.data.array,
                selectedAlgorithm.name,
                clonedState.settings.includeReadsSteps
            );
            selectedAlgorithm.sort(simulation);
            simulation.addLastStep();
            clonedState.data.simulation = simulation;
            clonedState.ui.renderArray = [...simulation.steps[0].array];
            clonedState.ui.reads = [];
            clonedState.ui.writes = [];
            clonedState.data.step = 0;

            clonedState.ui.isSimulationPlaying = true;

            return clonedState;
        }
        case PLAY_PAUSE_SIMULATION: {
            const clonedState: AppState = cloneAppState(state);

            clonedState.ui.isSimulationPlaying = !clonedState.ui.isSimulationPlaying;
            if (clonedState.data.step == clonedState.data.simulation.steps.length - 1) {
                clonedState.data.step = 0;
            }

            return clonedState;
        }
        case GOTO_SIMULATION_STEP: {
            const clonedState: AppState = cloneAppState(state);

            let nextStep = clonedState.data.step + action.payload;

            if (nextStep < 0) {
                nextStep = 0;
            }
            if (nextStep >= clonedState.data.simulation.steps.length) {
                nextStep = clonedState.data.simulation.steps.length - 1;
                clonedState.ui.isSimulationPlaying = false;
            }

            clonedState.data.step = nextStep;
            const nextSimulationStep = clonedState.data.simulation.steps[nextStep];
            clonedState.ui.renderArray = [...nextSimulationStep.array];
            clonedState.ui.reads = [...nextSimulationStep.reads];
            clonedState.ui.writes = [...nextSimulationStep.writes];
            clonedState.ui.start = nextSimulationStep.start;
            clonedState.ui.end = nextSimulationStep.end;

            return clonedState;
        }
        case CHANGE_SLIDER: {
            const clonedState: AppState = cloneAppState(state);

            clonedState.data.speed = Math.floor(action.payload);

            return clonedState;
        }
        default:
            return state;
    }
}
