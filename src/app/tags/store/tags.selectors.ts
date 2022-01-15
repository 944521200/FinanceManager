import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Tag } from 'src/app/model/tag.model';
import { State } from './tags.reducer';

export const selectTagsState = createFeatureSelector<State>('tags');

export const selectAllTags = createSelector(selectTagsState, (state: State) => state.tags);

export const selectEditingTag = createSelector(selectTagsState, (state: State) => state.editingTag);

export const selectEditing = createSelector(selectTagsState, (state: State) => state.editing);

export const selectPaginationSettings = createSelector(selectTagsState, (state: State) => ({
    pageIndex: state.pageIndex,
    pageSize: state.pageSize,
}));

export const selectFilteredTags = createSelector(selectTagsState, selectAllTags, (state: State, allTags: Tag[]) => {
    let filteredTags: Tag[] = [...allTags];
    if (state.nameFilter !== '')
        filteredTags = filteredTags.filter((item: Tag) =>
            item.name.toLowerCase().includes(state.nameFilter.toLowerCase()),
        );

    if (state.descFilter !== '')
        filteredTags = filteredTags.filter((item: Tag) =>
            item.description.toLowerCase().includes(state.descFilter.toLowerCase()),
        );

    return filteredTags;
});

export const selectPaginatedTags = createSelector(
    selectTagsState,
    selectFilteredTags,
    (state: State, filteredTags: Tag[]) => [...filteredTags].splice(state.pageIndex * state.pageSize, state.pageSize),
);
