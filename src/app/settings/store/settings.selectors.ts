import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './settings.reducer';

export const selectSettingsState = createFeatureSelector<State>('settings');

export const selectNightMode = createSelector(selectSettingsState, (state: State) => state.nightMode);

export const selectCollapsedSidenav = createSelector(selectSettingsState, (state: State) => state.collapsedSivenav);
