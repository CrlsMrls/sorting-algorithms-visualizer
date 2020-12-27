import { algorithms, SortAlgorithm } from '../algorithms';
import { TrackableArray } from '../simulations/trackableArray';
import { SHOW_INFO_DIALOG, RUN_SIMULATION, SettingsState } from '../store/types';

export function closeDialog(dialogId: string) {
    const dialog = document.querySelector(`#${dialogId}`) as any;
    dialog.close();
}

export function openInfoDialog(heading: string, description: string) {
    const dialog = document.querySelector('#info-dialog') as any;
    dialog.heading = heading;
    (dialog.querySelector('.info-dialog__text') as HTMLDivElement).innerHTML = description;
    dialog.show();
}

export function openSettingsDialog(config: SettingsState) {
    const dialog = document.querySelector('#settings-dialog') as any;
    dialog.querySelector('mwc-textfield').value = config.size;
    dialog.querySelector('#settings-dialog__option-shuffle').checked = config.shuffleAtCreation;
    dialog.querySelector('#settings-dialog__option-reads').checked = config.includeReadsSteps;

    dialog.show();
}

export function isSettingsValid(): boolean {
    const dialog = document.querySelector('#settings-dialog') as any;
    const textField = dialog.querySelector('mwc-textfield');

    return textField.checkValidity();
}

export function getSettingsDialog(): SettingsState {
    const dialog = document.querySelector('#settings-dialog') as any;

    const settings: SettingsState = {
        size: dialog.querySelector('mwc-textfield').value,
        shuffleAtCreation: dialog.querySelector('#settings-dialog__option-shuffle').checked,
        includeReadsSteps: dialog.querySelector('#settings-dialog__option-reads').checked,
    };

    return settings;
}

export function showAlgorithmsResults(
    selector: string,
    algorithmsResults: TrackableArray[],
    store: any
): void {
    const parent: HTMLDivElement = document.querySelector(selector);
    // clean first current content
    parent.innerHTML = '';
    for (let i = 0; i < algorithms.length; i++) {
        parent.appendChild(createResult(algorithms[i], algorithmsResults[i], i, store));
    }
}

function createResult(
    algorithm: SortAlgorithm,
    array: TrackableArray,
    step: number,
    store: any
): HTMLLIElement {
    const element: HTMLLIElement = document.createElement('li');
    element.innerHTML = `
        <div class="algorithm__result">
            <h3>${algorithm.name}</h3> 
            <!-- Max callstack: ${array.maxStack} -->
            <div class="algorithm__result__content">
                <div>Reads: ${array.reads} - Writes ${array.writes}</div>
                <div class="algorithm__result__content_buttons">
                    <mwc-button class="info" label="Info" icon="info"></mwc-button>
                    <mwc-button class="run" label="Run" icon="play_arrow"></mwc-button>
                </div>
            </div>
        </div>
        `;
    element.querySelector('.info').addEventListener('click', () =>
        store.dispatch({
            type: SHOW_INFO_DIALOG,
            payload: { name: algorithm.name, description: algorithm.description },
        })
    );

    element
        .querySelector('.run')
        .addEventListener('click', () => store.dispatch({ type: RUN_SIMULATION, payload: step }));

    return element;
}
