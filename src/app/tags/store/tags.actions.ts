import { createAction, props } from '@ngrx/store';

export const deleteTag = createAction('[Tags] delete tag', props<{ deleteId: number }>());

export const editTag = createAction('[Tags] edit tag', props<{ editId: number }>());

export const updateEditingTag = createAction(
    '[Tags] update edit tag',
    props<{
        name?: string;
        description?: string;
        bgColor?: string;
        txtColor?: string;
    }>(),
);

export const confirmEditingTag = createAction('[Tags] confirm edit Tag');

export const discardEditingTag = createAction('[Tags] discard editing Tag');

export const tagsChanged = createAction('[Tags] tags changed');

export const resetState = createAction('[Tags] initialize state');
