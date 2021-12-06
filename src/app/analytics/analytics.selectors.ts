import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAllExpenses } from '../expenses/store/expenses.selectors';
import { Tag } from '../model/tag.model';
import { State } from './analytics.reducer';

export const selectAnalyticsState = createFeatureSelector<State>('analytics');

export const selectFromAndToDate = createSelector(selectAnalyticsState, (state: State) => {
    return { fromDate: state.fromDate, toDate: state.toDate };
});

export const selectSelectedExpenses = createSelector(selectAnalyticsState, selectAllExpenses, (state, allExpenses) => {
    return allExpenses.filter((expense) => {
        return expense.time.getTime() > state.fromDate.getTime() && expense.time.getTime() < state.toDate.getTime();
    });
});

// export const selectMonthlyGroupedExpenses = createSelector(
//     selectAnalyticsState,
//     selectSelectedExpenses,
//     (state, selectedExpenses) => {
//         console.log('From: ', state.fromDate.toLocaleDateString(), 'To: ', state.toDate.toLocaleDateString());
//         const result = monthsInsideInterval(state.fromDate, state.toDate);
//         selectedExpenses.forEach((expense) => {
//             result[expense.time.getMonth() + 1].push(expense);
//         });
//         return result;
//     },
// );

// export const selectYearlyGroupedExpenses = createSelector(
//     selectAnalyticsState,
//     selectSelectedExpenses,
//     (state, selectedExpenses) => {
//         console.log('From: ', state.fromDate.toLocaleDateString(), 'To: ', state.toDate.toLocaleDateString());
//         const result = yearsInsideIntervalTags(state.fromDate, state.toDate);
//         selectedExpenses.forEach((expense) => {
//             result[expense.time.getFullYear()].push(expense);
//         });
//         return result;
//     },
// );

//Donut anual
export const selectYearlyGroupedTags = createSelector(
    selectAnalyticsState,
    selectSelectedExpenses,
    (state, selectedExpenses) => {
        const result: { [year: number]: { [tagID: number]: { tag: Tag; count: number } } } = {}; //yearsInsideIntervalTags(state.fromDate, state.toDate);
        selectedExpenses.forEach((expense) => {
            expense.tags.forEach((tag) => {
                // eslint-disable-next-line no-extra-boolean-cast
                if (!Boolean(result[expense.time.getFullYear()])) result[expense.time.getFullYear()] = {};
                // eslint-disable-next-line no-extra-boolean-cast
                if (!Boolean(result[expense.time.getFullYear()][tag.ID]))
                    result[expense.time.getFullYear()][tag.ID] = { tag, count: 0 };
                result[expense.time.getFullYear()][tag.ID].count += expense.amount * expense.pricePerUnit;
            });
        });
        return result;
    },
);

//bar chart montly expenses
export const selectYearlyMonthlyExpenses = createSelector(
    selectAnalyticsState,
    selectSelectedExpenses,
    (state, selectedExpenses) => {
        const result: { [year: number]: { [month: number]: number } } = {}; // yearsInsideIntervalMonthlyExpense(state.fromDate, state.toDate);
        selectedExpenses.forEach((expense) => {
            // eslint-disable-next-line no-extra-boolean-cast
            if (!Boolean(result[expense.time.getFullYear()]))
                result[expense.time.getFullYear()] = {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0,
                    5: 0,
                    6: 0,
                    7: 0,
                    8: 0,
                    9: 0,
                    10: 0,
                    11: 0,
                    12: 0,
                };
            result[expense.time.getFullYear()][expense.time.getMonth() + 1] += expense.amount * expense.pricePerUnit;
        });
        return result;
    },
);
