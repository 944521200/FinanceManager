import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import * as AnalyticsActions from './analytics.actions';

@Injectable()
export class AnalyticsEffects {
    saveEffect$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AnalyticsActions.setFromAndToDate, AnalyticsActions.overrideAnalyticsSettings), //TODO añadir más
                tap(() => {
                    this.store.dispatch(AnalyticsActions.analyticsChanged());
                }),
            ),
        { dispatch: false },
    );

    constructor(private actions$: Actions, private store: Store) {}
}
