import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import * as TagsActions from './tags.actions';

@Injectable()
export class TagsEffects {
    saveEffect$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(TagsActions.confirmEditingTag, TagsActions.deleteTag, TagsActions.overrideTags),
                tap(() => {
                    this.store.dispatch(TagsActions.tagsChanged());
                }),
            ),
        { dispatch: false },
    );

    constructor(private actions$: Actions, private store: Store) {}
}
