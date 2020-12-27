import { Simulation } from '../simulations/simulation';
import { TrackableArray } from '../simulations/trackableArray';

//--// ACTIONS //--//

export const CREATE_ARRAY = 'Create array';
export const SHOW_INFO_DIALOG = 'Show info';
export const CLOSE_INFO_DIALOG = 'Close info';
export const SHOW_SETTINGS_DIALOG = 'Show config dialog';
export const CLOSE_SETTINGS_DIALOG = 'Close config dialog';
export const CONFIRM_SETTINGS_DIALOG = 'Confirm config dialog';
export const RUN_SIMULATION = 'Run simulation';
export const PLAY_PAUSE_SIMULATION = 'Play/Pause simulation';
export const GOTO_SIMULATION_STEP = 'Goto simulation step';
export const CHANGE_SLIDER = 'Change slider';

interface Action {
    type: string;
    payload?: any;
}

interface CreateArrayAction extends Action {
    type: typeof CREATE_ARRAY;
}

interface RunSimulationAction extends Action {
    type: typeof RUN_SIMULATION;
    payload: number;
}

interface ShowInfoAction extends Action {
    type: typeof SHOW_INFO_DIALOG;
    payload: { name: string; description: string };
}

interface CloseInfo extends Action {
    type: typeof CLOSE_INFO_DIALOG;
}

//// SETTINGS DIALOG ACTIONS
interface ShowSettingsDialogAction extends Action {
    type: typeof SHOW_SETTINGS_DIALOG;
}

interface CloseSettingsDialogAction extends Action {
    type: typeof CLOSE_SETTINGS_DIALOG;
}

interface ConfirmSettingsDialogAction extends Action {
    type: typeof CONFIRM_SETTINGS_DIALOG;
    payload: SettingsState;
}

interface PlayPauseSimulation extends Action {
    type: typeof PLAY_PAUSE_SIMULATION;
}

interface GotoSimulationStep extends Action {
    type: typeof GOTO_SIMULATION_STEP;
    payload: number;
}
interface ChangeSlider extends Action {
    type: typeof CHANGE_SLIDER;
    payload: number;
}

export type ActionTypes =
    | CreateArrayAction
    | RunSimulationAction
    | ShowInfoAction
    | CloseInfo
    | ShowSettingsDialogAction
    | CloseSettingsDialogAction
    | ConfirmSettingsDialogAction
    | PlayPauseSimulation
    | GotoSimulationStep
    | ChangeSlider;

//--// STATE //--//

export interface UIState {
    isArray: boolean; // render array may not exist
    showAlgorithmsResults: boolean;
    isSimulationPlaying: boolean;
    /// rendered array
    renderArray: number[];
    reads: number[];
    writes: number[];
    start: number;
    end: number;
    /// config dialog
    isSettingsDialogOpen: boolean;
    /// info dialog
    isInfoDialogOpen: boolean;
    infoName?: string;
    infoDescription?: string;
}

export interface SettingsState {
    size: number;
    includeReadsSteps: boolean;
    shuffleAtCreation: boolean;
}

export interface DataState {
    array: number[];
    algorithmsResults: TrackableArray[];
    simulation: Simulation;
    step: number;
    speed: number;
}

export interface AppState {
    ui: UIState;
    settings: SettingsState;
    data: DataState;
}
