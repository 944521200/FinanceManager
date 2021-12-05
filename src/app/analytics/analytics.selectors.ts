import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAllExpenses } from '../expenses/store/expenses.selectors';
import { Tag } from '../model/tag.model';
import { State } from './analytics.reducer';

export const selectAnalyticsState = createFeatureSelector<State>('analytics');

export const selectFromDate = createSelector(selectAnalyticsState, (state: State) => state.fromDate);

export const selectToDate = createSelector(selectAnalyticsState, (state: State) => state.toDate);

export const selectSelectedExpenses = createSelector(selectAnalyticsState, selectAllExpenses, (state, allExpenses) => {
    console.log('From: ', state.fromDate.toLocaleDateString(), 'To: ', state.toDate.toLocaleDateString());
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
        console.log('From: ', state.fromDate.toLocaleDateString(), 'To: ', state.toDate.toLocaleDateString());
        const result = yearsInsideIntervalTags(state.fromDate, state.toDate);
        selectedExpenses.forEach((expense) => {
            expense.tags.forEach((tag) => {
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
        console.log('From: ', state.fromDate.toLocaleDateString(), 'To: ', state.toDate.toLocaleDateString());
        const result = yearsInsideIntervalMonthlyExpense(state.fromDate, state.toDate);
        selectedExpenses.forEach((expense) => {
            result[expense.time.getFullYear()][expense.time.getMonth() + 1] += expense.amount * expense.pricePerUnit;
        });
        return result;
    },
);
// export const selectYearlyMontlyExpenses = createSelector(
//     selectAnalyticsState,
//     selectSelectedExpenses,
//     (state, selectedExpenses) => {
//         console.log('From: ', state.fromDate.toLocaleDateString(), 'To: ', state.toDate.toLocaleDateString());
//         const result = yearsMonthsInsideInterval(state.fromDate, state.toDate);
//         selectedExpenses.forEach((expense) => {
//             result[expense.time.getFullYear()][expense.time.getMonth() + 1].push(expense);
//         });
//         return result;
//     },
// );

// function monthsInsideInterval(from: Date, to: Date): { [key: number]: Expense[] } {
//     const result: { [key: number]: Expense[] } = {};
//     for (let i = from.getMonth() + 1; i <= to.getMonth() + 1; i++) {
//         result[i] = [];
//     }
//     return result;
// }

// function yearsMonthsInsideInterval(from: Date, to: Date): { [key: number]: { [key: number]: Expense[] } } {
//     const result: { [key: number]: { [key: number]: Expense[] } } = {};
//     for (let i = from.getFullYear(); i <= to.getFullYear(); i++) {
//         result[i] = {
//             '1': [],
//             '2': [],
//             '3': [],
//             '4': [],
//             '5': [],
//             '6': [],
//             '7': [],
//             '8': [],
//             '9': [],
//             '10': [],
//             '11': [],
//             '12': [],
//         };
//     }
//     return result;
// }

// function getTagStats(expenses: Expense[]): { [key: number]: number } {
//     const result: { [key: number]: number } = {};
//     expenses.forEach((expense) => {
//         expense.tags.forEach((tag) => {
//             if (Number.isNaN(result[tag.ID])) result[tag.ID] = 0;
//             result[tag.ID] += expense.amount * expense.pricePerUnit;
//         });
//     });
//     return result;
// }

function yearsInsideIntervalTags(
    from: Date,
    to: Date,
): { [year: number]: { [tagID: number]: { tag: Tag; count: number } } } {
    const result: { [key: number]: { [key: number]: { tag: Tag; count: number } } } = {};
    for (let i = from.getFullYear(); i <= to.getFullYear(); i++) {
        result[i] = {};
    }
    return result;
}

function yearsInsideIntervalMonthlyExpense(from: Date, to: Date): { [year: number]: { [month: number]: number } } {
    const result: { [year: number]: { [month: number]: number } } = {};
    for (let i = from.getFullYear(); i <= to.getFullYear(); i++) {
        result[i] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 };
    }
    return result;
}
