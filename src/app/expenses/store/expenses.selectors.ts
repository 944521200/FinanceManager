import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Tag } from 'src/app/model/tag.model';
import * as TagsSelectors from 'src/app/tags/store/tags.selectors';
import { State } from './expenses.reducer';

export const selectExpensesState = createFeatureSelector<State>('expenses');

export const selectAllExpenses = createSelector(
    selectExpensesState,
    TagsSelectors.selectAllTags,
    (state: State, allTags: Tag[]) =>
        state.expenses.map((expense) => {
            const newExpense = { ...expense };
            newExpense.tags = allTags.filter((tag) => newExpense.tags.map((tag) => tag.ID).includes(tag.ID));
            return newExpense;
        }),
);

export const selectEditingExpense = createSelector(
    selectExpensesState,
    TagsSelectors.selectAllTags,
    (state: State, allTags: Tag[]) => {
        const newExpense = { ...state.editingExpense };
        newExpense.tags = allTags.filter((tag) => newExpense.tags.map((tag) => tag.ID).includes(tag.ID));
        return newExpense;
    },
);

export const selectEditing = createSelector(selectExpensesState, (state: State) => state.editing);
