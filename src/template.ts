import {
    AppState,
    CREATE_ARRAY,
    CLOSE_INFO_DIALOG,
    PLAY_PAUSE_SIMULATION,
    GOTO_SIMULATION_STEP,
    CHANGE_SLIDER,
    CLOSE_SETTINGS_DIALOG,
    SHOW_SETTINGS_DIALOG,
    CONFIRM_SETTINGS_DIALOG,
} from './store/types';
import { graphArray } from './view/graph';
import {
    showAlgorithmsResults,
    openInfoDialog,
    closeDialog,
    openSettingsDialog,
    getSettingsDialog,
    isSettingsValid,
} from './view/utils';

export class Template {
    private buttons: string[] = [
        'slider',
        'fast_rewind',
        'skip_previous',
        'play_pause',
        'skip_next',
        'fast_forward',
    ];

    constructor(store: any) {
        this.attachActions(store);
        store.subscribe(() => this.render(store));
        this.render(store);
    }

    attachActions(store: any): void {
        document
            .querySelector('#new-array')
            .addEventListener('click', () => store.dispatch({ type: CREATE_ARRAY }));

        document
            .querySelector('#info-dialog')
            .addEventListener('closed', () => store.dispatch({ type: CLOSE_INFO_DIALOG }));

        document
            .querySelector('#settings-dialog')
            .addEventListener('closed', () => store.dispatch({ type: CLOSE_SETTINGS_DIALOG }));

        document.querySelector('#settings-dialog__confirm-button').addEventListener('click', () => {
            if (!isSettingsValid()) {
                return;
            }

            store.dispatch({
                type: CONFIRM_SETTINGS_DIALOG,
                payload: getSettingsDialog(),
            });
            store.dispatch({ type: CREATE_ARRAY });
        });

        document
            .querySelector('#settings')
            .addEventListener('click', () => store.dispatch({ type: SHOW_SETTINGS_DIALOG }));

        document
            .querySelector('#play_pause')
            .addEventListener('click', () => store.dispatch({ type: PLAY_PAUSE_SIMULATION }));

        const slider: HTMLInputElement = document.querySelector('#slider');
        slider.addEventListener('change', () =>
            store.dispatch({ type: CHANGE_SLIDER, payload: slider.value })
        );

        const gotoStep = (diff: number) => () =>
            store.dispatch({ type: GOTO_SIMULATION_STEP, payload: diff });

        document.querySelector('#fast_rewind').addEventListener('click', gotoStep(-100));
        document.querySelector('#skip_previous').addEventListener('click', gotoStep(-1));
        document.querySelector('#skip_next').addEventListener('click', gotoStep(1));
        document.querySelector('#fast_forward').addEventListener('click', gotoStep(100));
    }

    render(store: any): void {
        console.log('render!');

        const appState: AppState = store.getState();

        if (appState.data.array != null) {
            graphArray(
                'canvas#graph',
                appState.ui.renderArray,
                appState.ui.reads,
                appState.ui.writes,
                appState.ui.start,
                appState.ui.end
            );
        }
        if (appState.ui.showAlgorithmsResults) {
            showAlgorithmsResults('#algorithms-results', appState.data.algorithmsResults, store);
        } else {
            // parent.innerHTML = '';
        }

        closeDialog('info-dialog');
        closeDialog('settings-dialog');

        if (appState.ui.isInfoDialogOpen) {
            openInfoDialog(appState.ui.infoName, appState.ui.infoDescription);
        }

        if (appState.ui.isSettingsDialogOpen) {
            openSettingsDialog(appState.settings);
        }

        // disable/enable buttons and update number of steps
        if (appState.data.simulation == null) {
            this.buttons.forEach((button: string) => (this.button(button).disabled = true));
            document.querySelector('#steps').innerHTML = '';
            document.querySelector('#simulation_name').innerHTML = '';
        } else {
            this.buttons.forEach((button: string) => (this.button(button).disabled = false));
            const simulation = appState.data.simulation;
            const total = simulation.steps.length - 1;
            document.querySelector('#steps').innerHTML = `${appState.data.step} of ${total}`;
            document.querySelector('#simulation_name').innerHTML = `- ${simulation.name}`;
        }

        (this.button('play_pause') as any).icon = appState.ui.isSimulationPlaying
            ? 'pause'
            : 'play_arrow';
    }

    private button(selector: string): HTMLButtonElement {
        return document.querySelector(`#${selector}`);
    }
}
