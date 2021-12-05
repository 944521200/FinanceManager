import { createReducer, on } from '@ngrx/store';
import { DEFAULT_TAG, Tag } from 'src/app/model/tag.model';
import * as TagsActions from './tags.actions';

const LOCAL_STORAGE_KEY = 'Tags';
const initialState: State = { tags: [], tagCounter: -1, editingTag: DEFAULT_TAG, editing: false };

export interface State {
    tags: Tag[];
    tagCounter: number;
    editingTag: Tag;
    editing: boolean;
}

export const tagsReducer = createReducer(
    initialState,
    on(TagsActions.initializeState, (state) => {
        return { ...state, ...calculateInitialState() };
    }),

    on(TagsActions.deleteTag, (state, { deleteId }) => {
        return {
            ...state,
            tags: state.tags.filter((tag) => tag.ID !== deleteId),
        };
    }),

    on(TagsActions.editTag, (state, { editId }) => {
        const editingTag: Tag = state.tags.find((tag) => tag.ID === editId) ?? DEFAULT_TAG;
        return {
            ...state,
            editing: editId !== -1,
            editingTag: editingTag,
        };
    }),
    on(TagsActions.updateEditingTag, (state, { name, description, txtColor, bgColor }) => {
        const currentTag = state.editingTag;
        return {
            ...state,
            editingTag: {
                ...state.editingTag,
                name: name ?? currentTag.name,
                description: description ?? currentTag.description,
                txtColor: txtColor ?? currentTag.txtColor,
                bgColor: bgColor ?? currentTag.bgColor,
            },
        };
    }),

    on(TagsActions.confirmEditingTag, (state) => {
        const confirmingTag = { ...state.editingTag };
        const nextCounter = state.editing ? state.tagCounter : state.tagCounter + 1;
        confirmingTag.ID = !state.editing ? state.tagCounter + 1 : confirmingTag.ID;

        return {
            ...state,
            tagCounter: nextCounter,
            editingTag: DEFAULT_TAG,
            editing: false,
            tags: [...state.tags.filter((tag) => tag.ID !== state.editingTag.ID), { ...confirmingTag }],
        };
    }),
    on(TagsActions.discardEditingTag, (state) => {
        return {
            ...state,
            editing: false,
            editingTag: DEFAULT_TAG,
        };
    }),
    on(TagsActions.tagsChanged, (state) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
        return { ...state };
    }),
);

function calculateTagCounter(tags: Tag[]) {
    let tagCounter = -1;
    tags.forEach((tag) => {
        if (tagCounter < tag.ID) tagCounter = tag.ID;
    });

    return tagCounter;
}

function getStateFromLocalStorage() {
    const localStorage: Storage = window.localStorage;
    const tagsSTR = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (tagsSTR != null && tagsSTR != '') {
        console.log('Tags database found');
        return JSON.parse(tagsSTR);
    } else {
        console.log('Tags database NOT found');
        return {};
    }
}

function calculateInitialState() {
    let state: State = initialState;
    state = { ...state, ...getStateFromLocalStorage() };
    state.tagCounter = calculateTagCounter(state.tags);
    return state;
}
