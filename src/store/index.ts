import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from './reducer';
import {
    ActionTypes,
    AppState,
    GOTO_SIMULATION_STEP,
    PLAY_PAUSE_SIMULATION,
    RUN_SIMULATION,
} from './types';

const logger = (store: any) => (next: any) => (action: ActionTypes) => {
    console.group(action.type);
    console.info('dispatching', action);
    const result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
    return result;
};

let prevTimeout: NodeJS.Timeout;

const startSimulation = (store: any) => (next: any) => (action: ActionTypes) => {
    if (![RUN_SIMULATION, PLAY_PAUSE_SIMULATION].includes(action.type)) {
        return next(action);
    }

    clearTimeout(prevTimeout);

    // TODO prevent clicking multiple times in run simulation
    const result = next(action);
    play();
    return result;

    function play(): void {
        const appState: AppState = store.getState();
        if (appState.ui.isSimulationPlaying) {
            store.dispatch({ type: GOTO_SIMULATION_STEP, payload: 1 });
            prevTimeout = setTimeout(play, appState.data.speed);
        }
    }
};

const composedEnhancer = composeWithDevTools(applyMiddleware(logger, startSimulation));

export const store = createStore(rootReducer, composedEnhancer);
