import { createReducer, on } from '@ngrx/store';
import { DEFAULT_EXPENSE, Expense } from 'src/app/model/expense.model';
import * as ExpensesActions from './expenses.actions';

const LOCAL_STORAGE_KEY = 'Expenses';
const initialState: State = { expenses: [], expenseCounter: -1, editingExpense: DEFAULT_EXPENSE, editing: false };

export interface State {
    expenses: Expense[];
    expenseCounter: number;
    editingExpense: Expense;
    editing: boolean;
}

export const expensesReducer = createReducer(
    initialState,
    on(ExpensesActions.initializeState, (state) => {
        return { ...state, ...calculateInitialState() };
    }),
    on(ExpensesActions.deleteExpense, (state, { deleteId }) => {
        return {
            ...state,
            expenses: state.expenses.filter((expense) => expense.ID !== deleteId),
        };
    }),

    on(ExpensesActions.editExpense, (state, { editId }) => {
        const editingExpense: Expense = state.expenses.find((expense) => expense.ID === editId) || DEFAULT_EXPENSE;
        return {
            ...state,
            editing: editId !== -1,
            editingExpense: editingExpense,
        };
    }),
    on(ExpensesActions.updateEditingExpense, (state, { name, description, amount, pricePerUnit, tags, time }) => {
        const currentExpense = state.editingExpense;
        return {
            ...state,
            editingExpense: {
                ...state.editingExpense!,
                name: name || currentExpense.name,
                description: description || currentExpense.description,
                amount: amount || currentExpense.amount,
                pricePerUnit: pricePerUnit || currentExpense.pricePerUnit,
                tags: tags || currentExpense.tags,
                time: time || currentExpense.time,
            },
        };
    }),
    on(ExpensesActions.addTagsEditingExpense, (state, { tags }) => {
        const newTags =  [...state.editingExpense.tags, ...tags ];
        console.log("new>Tags",newTags);
        return { ...state, editingExpense: { ...state.editingExpense, tags: newTags } };
    }),
    on(ExpensesActions.removeTagsEditingExpense, (state, { tags }) => {
        return {
            ...state,
            editingExpense: {
                ...state.editingExpense,
                tags: state.editingExpense.tags.filter((tagID) => !tags.includes(tagID)),
            },
        };
    }),
    on(ExpensesActions.confirmEditingExpense, (state) => {
        console.log('Confirming: ', state.editingExpense, 'ediring,', state.editing);
        let confirmingExpense = { ...state.editingExpense };

        const nextCounter = state.editing ? state.expenseCounter : state.expenseCounter + 1;
        confirmingExpense.ID = !state.editing ? state.expenseCounter + 1 : confirmingExpense.ID;

        return {
            ...state,
            expenseCounter: nextCounter,
            editingExpense: DEFAULT_EXPENSE,
            editing: false,
            expenses: [
                ...state.expenses.filter((expense) => expense.ID !== state.editingExpense.ID),
                { ...confirmingExpense },
            ],
        };
    }),
    on(ExpensesActions.discardEditingExpense, (state) => {
        return {
            ...state,
            editing: false,
            editingExpense: DEFAULT_EXPENSE,
        };
    }),
    on(ExpensesActions.expensesChanged, (state) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
        return { ...state };
    }),
);

function calculateExpenseCounter(expenses: Expense[]) {
    let expenseCounter = -1;
    expenses.forEach((expense) => {
        if (expenseCounter < expense.ID!) expenseCounter = expense.ID!;
    });

    return expenseCounter;
}

function getStateFromLocalStorage() {
    let localStorage: Storage = window.localStorage;
    const expensesSTR = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (expensesSTR != null && expensesSTR != '') {
        console.log('Expenses database found');
        return JSON.parse(expensesSTR);
    } else {
        console.log('Expenses database NOT found');
        return {};
    }
}

function calculateInitialState() {
    let state: State = initialState;
    state = { ...state, ...getStateFromLocalStorage() };
    state.expenseCounter = calculateExpenseCounter(state.expenses);
    // state.expenses = state.expenses.map((expense) => {
    //     expense.time = new Date(expense.time);
    //     return expense;
    // });
    console.log('initial state', state);
    return state;
}
