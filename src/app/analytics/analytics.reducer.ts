import { createReducer, on } from '@ngrx/store';
import * as AnalyticsActions from './analytics.actions';

const STORAGE_KEY = 'analytics';
const initialState: State = calculateInitialState();

export interface State {
    fromDate: Date;
    toDate: Date;
}

export const analyticsReducer = createReducer(
    initialState,
    on(AnalyticsActions.resetState, (state) => {
        return { ...state, ...calculateInitialState() };
    }),
    on(AnalyticsActions.setFromAndToDate, (state, { fromDate, toDate }) => {
        return { ...state, toDate: toDate, fromDate: fromDate };
    }),
    on(AnalyticsActions.analyticsChanged, (state) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        return state;
    }),
);

function getStateFromLocalStorage() {
    const localStorage: Storage = window.localStorage;
    const tagsSTR = localStorage.getItem(STORAGE_KEY);
    if (tagsSTR != null && tagsSTR != '') {
        console.log('Tags database found');
        return JSON.parse(tagsSTR);
    } else {
        console.log('Tags database NOT found');
        return {};
    }
}

function calculateInitialState() {
    let state: State = { fromDate: new Date('2020/01/01'), toDate: new Date('2021/12/31') };
    state = { ...state, ...getStateFromLocalStorage() };
    state.fromDate = new Date(state.fromDate);
    state.toDate = new Date(state.toDate);
    return state;
}
