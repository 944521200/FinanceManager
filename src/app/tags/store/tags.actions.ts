import { createAction, props } from '@ngrx/store';
import { Tag } from 'src/app/model/tag.model';

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

export const overrideTags = createAction(
    '[Tags] override tags (IMPORT)',
    props<{
        tags: Tag[];
    }>(),
);

export const confirmEditingTag = createAction('[Tags] confirm edit Tag');

export const discardEditingTag = createAction('[Tags] discard editing Tag');

export const tagsChanged = createAction('[Tags] tags changed');

export const resetState = createAction('[Tags] initialize state');

export const setPagination = createAction(
    '[Tags] pagination settgins changed/set',
    props<{
        pageSize: number;
        pageIndex: number;
    }>(),
);

export const setFilters = createAction(
    '[Tags] filterting settgins changed/set',
    props<{
        nameFilter: string;
        descFilter: string;
    }>(),
);
