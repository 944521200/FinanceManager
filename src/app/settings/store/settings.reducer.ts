import { createReducer, on } from '@ngrx/store';
import * as SettingsActions from './settings.actions';

export const STORAGE_KEY = 'Settings';
const initialState: State = calculateInitialState();

export interface State {
    nightMode: boolean;
    collapsedSivenav: boolean;
}

export const settingsReducer = createReducer(
    initialState,
    on(SettingsActions.setNightMode, (state, action) => {
        return { ...state, nightMode: action.darkMode };
    }),
    on(SettingsActions.setCollapsedSivdenav, (state, action) => {
        return { ...state, collapsedSivenav: action.sidenavCollapse };
    }),
    on(SettingsActions.settingsChanged, (state) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        return state;
    }),
);
function getStateFromLocalStorage() {
    const localStorage: Storage = window.localStorage;
    const settingsSTR = localStorage.getItem(STORAGE_KEY);
    if (settingsSTR != null && settingsSTR != '') {
        console.log('settings database found');
        return JSON.parse(settingsSTR);
    } else {
        console.log('settings database NOT found');
        return {};
    }
}

function calculateInitialState() {
    let state: State = { nightMode: true, collapsedSivenav: false };
    state = { ...state, ...getStateFromLocalStorage() };
    return state;
}
