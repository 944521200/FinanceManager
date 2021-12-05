import { createAction, props } from '@ngrx/store';
import { Tag } from 'src/app/model/tag.model';

export const deleteExpense = createAction('[Expenses] delete expense', props<{ deleteId: number }>());

export const editExpense = createAction('[Expenses] start edit expense', props<{ editId: number }>());

export const updateEditingExpense = createAction(
    '[Expenses] update edit expense',
    props<{
        name?: string;
        description?: string;
        amount?: number;
        pricePerUnit?: number;
        tags?: Tag[];
        time?: Date;
    }>(),
);

export const addTagsEditingExpense = createAction(
    '[Expenses] add tag edit expense',
    props<{
        tags: Tag[];
    }>(),
);

export const removeTagsEditingExpense = createAction(
    '[Expenses] remove tag edit expense',
    props<{
        tags: Tag[];
    }>(),
);

export const confirmEditingExpense = createAction('[Expenses] confirm edit expense');

export const discardEditingExpense = createAction('[Expenses] discard editing expense');

export const expensesChanged = createAction('[Expenses] expenses changed');

export const resetState = createAction('[Expenses] initialize state');
