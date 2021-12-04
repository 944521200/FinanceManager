import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './expenses.reducer';

export const selectExpensesState = createFeatureSelector<State>('expenses');

export const selectAllExpenses = createSelector(selectExpensesState, (state: State) => state.expenses);

export const selectEditingExpense = createSelector(selectExpensesState, (state: State) => state.editingExpense);

export const selectEditing = createSelector(selectExpensesState, (state: State) => state.editing);
