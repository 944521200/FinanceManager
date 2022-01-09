import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import * as SettingsActions from './settings.actions';

@Injectable()
export class SettingsEffects {
    saveEffect$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(SettingsActions.setNightMode),
                tap(() => {
                    this.store.dispatch(SettingsActions.settingsChanged());
                }),
            ),
        { dispatch: false },
    );

    constructor(private actions$: Actions, private store: Store) {}
}
