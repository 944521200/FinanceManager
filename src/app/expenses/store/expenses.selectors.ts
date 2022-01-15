import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Expense } from 'src/app/model/expense.model';
import { State } from './expenses.reducer';

export const selectExpensesState = createFeatureSelector<State>('expenses');

export const selectAllExpenses = createSelector(selectExpensesState, (state: State) => [...state.expenses]);

export const selectFilteredExpenses = createSelector(
    selectExpensesState,
    selectAllExpenses,
    (state: State, allExpenses: Expense[]) => {
        let filteredExpenses: Expense[] = [...allExpenses];
        if (state.nameFilter !== '')
            filteredExpenses = filteredExpenses.filter((item: Expense) =>
                item.name.toLowerCase().includes(state.nameFilter.toLowerCase()),
            );

        if (state.descFilter !== '')
            filteredExpenses = filteredExpenses.filter((item: Expense) =>
                item.description.toLowerCase().includes(state.descFilter.toLowerCase()),
            );

        if (state.amountFilter != null)
            filteredExpenses = filteredExpenses.filter((item: Expense) =>
                (item.amount + '').includes(('' + state.amountFilter).toLowerCase()),
            );

        if (state.priceFilter != null)
            filteredExpenses = filteredExpenses.filter((item: Expense) =>
                (item.pricePerUnit + '').includes(('' + state.priceFilter).toLowerCase()),
            );

        if (state.dateSinceFilter) {
            const dateSince = new Date(state.dateSinceFilter);
            filteredExpenses = filteredExpenses.filter((item: Expense) => item.time.valueOf() >= dateSince.valueOf());
        }

        if (state.dateUntilFilter) {
            const dateUntil = new Date(state.dateUntilFilter);
            filteredExpenses = filteredExpenses.filter((item: Expense) => item.time.valueOf() < dateUntil.valueOf());
        }

        if (state.onlyShowUntagged) {
            filteredExpenses = filteredExpenses.filter((item: Expense) => item.tags.length === 0);
        } else if (state.filterTags.length !== 0) {
            const filterTagsIDs = state.filterTags;
            filteredExpenses = filteredExpenses.filter((item: Expense) => {
                return (
                    item.tags.every((tag) => filterTagsIDs.includes(tag)) &&
                    (!state.hideUntagged || item.tags.length !== 0)
                );
            });
        } else {
            filteredExpenses = filteredExpenses.filter((item: Expense) => {
                return !state.hideUntagged || item.tags.length !== 0;
            });
        }

        return filteredExpenses;
    },
);

export const selectPaginatedExpenses = createSelector(
    selectExpensesState,
    selectFilteredExpenses,
    (state: State, filteredExpenses: Expense[]) =>
        [...filteredExpenses].splice(state.pageIndex * state.pageSize, state.pageSize),
);

export const selectEditingExpense = createSelector(selectExpensesState, (state: State) => ({
    ...state.editingExpense,
}));

export const selectEditing = createSelector(selectExpensesState, (state: State) => state.editing);

export const selectPaginationSettings = createSelector(selectExpensesState, (state: State) => ({
    pageIndex: state.pageIndex,
    pageSize: state.pageSize,
}));
