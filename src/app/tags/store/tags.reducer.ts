import { createReducer, on } from '@ngrx/store';
import { DEFAULT_TAG, Tag } from 'src/app/model/tag.model';
import * as TagsActions from './tags.actions';

const STORAGE_KEY = 'Tags';
const initialState: State = calculateInitialState();

export interface State {
    tags: Tag[];
    tagCounter: number;

    /** Editing */
    editingTag: Tag;
    editing: boolean;

    /** Pagination */
    pageSize: number;
    pageIndex: number;

    /** Filters  */
    nameFilter: string;
    descFilter: string;
}

export interface StateDto {
    tags: Tag[];
    pageSize: number;
}

export const tagsReducer = createReducer(
    initialState,
    on(TagsActions.resetState, (state) => {
        return { ...state, ...calculateInitialState() };
    }),

    on(TagsActions.deleteTag, (state, { deleteId }) => {
        let newtags = [...state.tags];
        newtags = newtags.filter((tag) => tag.ID !== deleteId);
        return {
            ...state,
            tags: newtags,
        };
    }),

    on(TagsActions.editTag, (state, { editId }) => {
        const editingTag: Tag = state.tags.find((tag) => tag.ID === editId) ?? DEFAULT_TAG;
        return {
            ...state,
            editing: editingTag.ID !== -1,
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

        let newtags = [...state.tags];
        newtags = newtags.filter((tag) => tag.ID !== state.editingTag.ID);
        return {
            ...state,
            tagCounter: nextCounter,
            editingTag: DEFAULT_TAG,
            editing: false,
            tags: [{ ...confirmingTag }, ...newtags],
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
        const toSave: StateDto = {
            tags: state.tags,
            pageSize: state.pageSize,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
        return state;
    }),
    on(TagsActions.overrideTags, (state, { tags }) => {
        return { ...state, tags, tagCounter: calculateTagCounter(tags), editing: false, editingTag: DEFAULT_TAG };
    }),
    on(TagsActions.setPagination, (state, { pageSize, pageIndex }) => {
        return { ...state, pageSize, pageIndex };
    }),
    on(TagsActions.setFilters, (state, { nameFilter, descFilter }) => {
        return {
            ...state,
            nameFilter,
            descFilter,
        };
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
    const tagsSTR = localStorage.getItem(STORAGE_KEY);
    if (tagsSTR != null && tagsSTR != '') {
        console.log('Tags database found');
        return JSON.parse(tagsSTR);
    } else {
        console.log('Tags database NOT found');
        return {};
    }
}

function calculateInitialState() {
    let state: State = {
        tags: [],
        tagCounter: -1,
        editingTag: DEFAULT_TAG,
        editing: false,
        pageSize: 10,
        pageIndex: 0,
        nameFilter: '',
        descFilter: '',
    };
    state = { ...state, ...getStateFromLocalStorage() };
    state.tagCounter = calculateTagCounter(state.tags);
    return state;
}
