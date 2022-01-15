import { createAction, props } from '@ngrx/store';
import { Expense } from 'src/app/model/expense.model';

export const deleteExpense = createAction('[Expenses] delete expense', props<{ deleteId: number }>());

export const editExpense = createAction('[Expenses] start edit expense', props<{ editId: number }>());

export const updateEditingExpense = createAction(
    '[Expenses] update edit expense',
    props<{
        name?: string;
        description?: string;
        amount?: number;
        pricePerUnit?: number;
        tags?: number[];
        time?: Date;
    }>(),
);

export const addTagsEditingExpense = createAction(
    '[Expenses] add tag edit expense',
    props<{
        tags: number[];
    }>(),
);

export const overrideExpenses = createAction(
    '[Expenses] override expenses (IMPORT)',
    props<{
        expenses: Expense[];
    }>(),
);

export const removeTagEditingExpense = createAction(
    '[Expenses] remove tag edit expense',
    props<{
        tagId: number;
    }>(),
);

export const confirmEditingExpense = createAction('[Expenses] confirm edit expense');

export const discardEditingExpense = createAction('[Expenses] discard editing expense');

export const expensesChanged = createAction('[Expenses] expenses changed');

export const resetState = createAction('[Expenses] initialize state');

export const setPagination = createAction(
    '[Expenses] pagination settgins changed/set',
    props<{
        pageSize: number;
        pageIndex: number;
    }>(),
);

export const setFilters = createAction(
    '[Expenses] filterting settgins changed/set',
    props<{
        nameFilter: string;
        descFilter: string;
        amountFilter: string;
        priceFilter: string;
        dateSinceFilter?: Date;
        dateUntilFilter?: Date;
        filterTags: number[];
        onlyShowUntagged: boolean;
        hideUntagged: boolean;
    }>(),
);
