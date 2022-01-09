import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import * as ExpenseActions from './expenses.actions';

@Injectable()
export class ExpensesEffects {
    saveEffect$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    ExpenseActions.confirmEditingExpense,
                    ExpenseActions.deleteExpense,
                    ExpenseActions.overrideExpenses,
                ), //TODO añadir más
                tap(() => {
                    this.store.dispatch(ExpenseActions.expensesChanged());
                }),
            ),
        { dispatch: false },
    );

    constructor(private actions$: Actions, private store: Store) {}
}
