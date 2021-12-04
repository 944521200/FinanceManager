import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './tags.reducer';

export const selectTagsState = createFeatureSelector<State>('tags');

export const selectAllTags = createSelector(selectTagsState, (state: State) => state.tags);

export const selectEditingTag = createSelector(selectTagsState, (state: State) => state.editingTag);

export const selectEditing = createSelector(selectTagsState, (state: State) => state.editing);
