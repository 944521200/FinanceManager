/* eslint-disable no-extra-boolean-cast */
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

//Donut anual
export const selectYearlyTags = createSelector(selectSelectedExpenses, (selectedExpenses) => {
    const data: { [year: number]: { [tagID: number]: { tag: Tag; count: number } } } = {};
    selectedExpenses.forEach((expense) => {
        expense.tags.forEach((tag) => {
            if (!Boolean(data[expense.time.getFullYear()])) data[expense.time.getFullYear()] = {};
            if (!Boolean(data[expense.time.getFullYear()][tag.ID]))
                data[expense.time.getFullYear()][tag.ID] = { tag, count: 0 };
            data[expense.time.getFullYear()][tag.ID].count += expense.amount * expense.pricePerUnit;
        });
    });

    const result: { [year: number]: { labels: string[]; count: number[]; bgColor: string[] } } = {};
    Object.keys(data).forEach((year) => {
        if (!Boolean(result[+year])) result[+year] = { labels: [], count: [], bgColor: [] };
        result[+year].labels = Object.values(data[+year]).map((selectedTag) => selectedTag.tag.name);
        result[+year].count = Object.values(data[+year]).map((selectedTag) => selectedTag.count);
        result[+year].bgColor = Object.values(data[+year]).map((selectedTag) => selectedTag.tag.bgColor);
    });

    return result;
});

//bar chart montly expenses
export const selectMonthlyExpensesPerYear = createSelector(selectSelectedExpenses, (selectedExpenses) => {
    const data: { [year: number]: { [month: number]: number } } = {};
    selectedExpenses.forEach((expense) => {
        if (!Boolean(data[expense.time.getFullYear()]))
            data[expense.time.getFullYear()] = {
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
        data[expense.time.getFullYear()][expense.time.getMonth() + 1] += expense.amount * expense.pricePerUnit;
    });

    const result: { [year: string]: number[] } = {};
    Object.keys(data).forEach((year) => {
        result[year] = Object.values(data[+year]);
    });
    return result;
});

//Donut mensual
export const SelectMontlyTagsPerYear = createSelector(selectSelectedExpenses, (selectedExpenses) => {
    const data: { [year: number]: { [month: string]: { [tagID: number]: { tag: Tag; count: number } } } } = {};
    selectedExpenses.forEach((expense) => {
        expense.tags.forEach((tag) => {
            if (!Boolean(data[expense.time.getFullYear()])) data[expense.time.getFullYear()] = {};

            if (!Boolean(data[expense.time.getFullYear()][expense.time.getMonth() + 1]))
                data[expense.time.getFullYear()][expense.time.getMonth() + 1] = {};

            if (!Boolean(data[expense.time.getFullYear()][expense.time.getMonth() + 1][tag.ID]))
                data[expense.time.getFullYear()][expense.time.getMonth() + 1][tag.ID] = { tag, count: 0 };
            data[expense.time.getFullYear()][expense.time.getMonth() + 1][tag.ID].count +=
                expense.amount * expense.pricePerUnit;
        });
    });

    const result: { [year: string]: { [month: string]: { labels: string[]; count: number[]; bgColor: string[] } } } =
        {};
    Object.keys(data).forEach((year) => {
        result[+year] = {};
        Object.keys(data[+year]).forEach((month) => {
            if (!Boolean(result[+year][+month])) result[+year][+month] = { labels: [], count: [], bgColor: [] };
            result[+year][+month].labels = Object.values(data[+year][+month]).map(
                (selectedTag) => selectedTag.tag.name,
            );
            result[+year][+month].count = Object.values(data[+year][+month]).map((selectedTag) => selectedTag.count);
            result[+year][+month].bgColor = Object.values(data[+year][+month]).map(
                (selectedTag) => selectedTag.tag.bgColor,
            );
        });
    });

    return result;
});

//bar chart daily expenses
export const selectDailyExpensesPerMonthYear = createSelector(selectSelectedExpenses, (selectedExpenses) => {
    const data: { [year: number]: { [month: number]: { [day: number]: number } } } = {};
    selectedExpenses.forEach((expense) => {
        if (!Boolean(data[expense.time.getFullYear()])) data[expense.time.getFullYear()] = {};

        if (!Boolean(data[expense.time.getFullYear()][expense.time.getMonth() + 1]))
            data[expense.time.getFullYear()][expense.time.getMonth() + 1] = getDaysOfMonth(
                expense.time.getFullYear(),
                expense.time.getMonth() + 1,
            );
        data[expense.time.getFullYear()][expense.time.getMonth() + 1][expense.time.getDate()] +=
            expense.amount * expense.pricePerUnit;
    });

    const result: { [year: string]: { [month: string]: { count: number[]; labels: string[] } } } = {};
    Object.keys(data).forEach((year) => {
        result[year] = {};
        Object.keys(data[+year]).forEach((month) => {
            if (!Boolean(result[year][month])) result[year][month] = { labels: [], count: [] };
            result[year][month].count = Object.values(data[+year][+month]);
            result[year][month].labels = Object.keys(data[+year][+month]);
        });
    });
    return result;
});

export const selectSelectedYearsWithMonths = createSelector(selectMonthlyExpensesPerYear, (monthlyExpenses) => {
    const result: { [year: string]: number[] } = {};
    Object.keys(monthlyExpenses)
        .filter((year) => {
            let sum = 0;
            Object.keys(monthlyExpenses[+year]).forEach((month) => {
                sum += monthlyExpenses[+year][+month];
            });
            return sum != 0;
        })
        .forEach((year) => {
            result[+year] = Object.keys(monthlyExpenses[+year])
                .filter((month) => monthlyExpenses[+year][+month] > 0)
                .map((month) => +month + 1);
        });
    return result;
});

export const selectSelectedYears = createSelector(selectSelectedYearsWithMonths, (yearsWithMonths) =>
    Object.keys(yearsWithMonths).map((key) => +key),
);

function getDaysOfMonth(year: number, month: number): { [day: string]: number } {
    const result: { [day: number]: number } = {};
    const date = new Date(year + '/' + month + '/01');
    while (date.getMonth() + 1 === month) {
        result[date.getDate()] = 0;
        date.setDate(date.getDate() + 1);
    }
    return result;
}
