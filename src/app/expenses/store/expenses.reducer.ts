import { createReducer, on } from '@ngrx/store';
import { DEFAULT_EXPENSE, Expense } from 'src/app/model/expense.model';
import * as ExpensesActions from './expenses.actions';

export const STORAGE_KEY = 'Expenses';
const initialState: State = calculateInitialState();

export interface State {
    /** Base */
    expenses: Expense[];
    expenseCounter: number;

    /** Editing */
    editingExpense: Expense;
    editing: boolean;

    /** Pagination */
    pageSize: number;
    pageIndex: number;

    /** Filters  */
    nameFilter: string;
    descFilter: string;
    amountFilter: string;
    priceFilter: string;
    dateSinceFilter?: Date;
    dateUntilFilter?: Date;
    filterTags: number[];
    onlyShowUntagged: boolean;
    hideUntagged: boolean;
}

export interface StateDto {
    /** Base */
    expenses: Expense[];
    /** Pagination */
    pageSize: number;
}

export const expensesReducer = createReducer<State>(
    initialState,
    on(ExpensesActions.resetState, (state) => {
        return { ...state, ...calculateInitialState() };
    }),
    on(ExpensesActions.deleteExpense, (state, { deleteId }) => {
        let newExpenses = [...state.expenses];
        newExpenses = newExpenses.filter((expense) => expense.ID !== deleteId);
        return {
            ...state,
            expenses: newExpenses,
        };
    }),

    on(ExpensesActions.editExpense, (state, { editId }) => {
        const editingExpense: Expense = state.expenses.find((expense) => expense.ID === editId) ?? DEFAULT_EXPENSE;
        return {
            ...state,
            editing: editingExpense.ID !== -1,
            editingExpense: editingExpense,
        };
    }),
    on(ExpensesActions.updateEditingExpense, (state, { name, description, amount, pricePerUnit, tags, time }) => {
        const currentExpense = state.editingExpense;
        return {
            ...state,
            editingExpense: {
                ...state.editingExpense,
                name: name ?? currentExpense.name,
                description: description ?? currentExpense.description,
                amount: amount ?? currentExpense.amount,
                pricePerUnit: pricePerUnit ?? currentExpense.pricePerUnit,
                tags: tags ?? currentExpense.tags,
                time: time ?? currentExpense.time,
            },
        };
    }),
    on(ExpensesActions.addTagsEditingExpense, (state, { tags }) => {
        const newTags = [...state.editingExpense.tags, ...tags];
        return { ...state, editingExpense: { ...state.editingExpense, tags: newTags } };
    }),
    on(ExpensesActions.removeTagEditingExpense, (state, { tagId }) => {
        return {
            ...state,
            editingExpense: {
                ...state.editingExpense,
                tags: state.editingExpense.tags.filter((tag) => tagId !== tag),
            },
        };
    }),
    on(ExpensesActions.confirmEditingExpense, (state) => {
        const confirmingExpense = { ...state.editingExpense };

        const nextCounter = state.editing ? state.expenseCounter : state.expenseCounter + 1;
        confirmingExpense.ID = !state.editing ? state.expenseCounter + 1 : confirmingExpense.ID;

        const newExpenses = [...state.expenses.filter((expense) => expense.ID != state.editingExpense.ID)];

        return {
            ...state,
            expenseCounter: nextCounter,
            editingExpense: DEFAULT_EXPENSE,
            editing: false,
            expenses: [confirmingExpense, ...newExpenses],
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
        const toSave: StateDto = {
            expenses: state.expenses,
            pageSize: state.pageSize,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
        return state;
    }),
    on(ExpensesActions.overrideExpenses, (state, { expenses }) => {
        return {
            ...state,
            expenses: expenses.map(
                (expense) =>
                    new Expense(
                        expense.ID,
                        expense.name,
                        expense.description,
                        expense.amount,
                        expense.pricePerUnit,
                        expense.time,
                        expense.tags,
                    ),
            ),
            expenseCounter: calculateExpenseCounter(expenses),
            editing: false,
            editingExpense: DEFAULT_EXPENSE,
        };
    }),
    on(ExpensesActions.setPagination, (state, { pageSize, pageIndex }) => {
        return { ...state, pageSize, pageIndex };
    }),
    on(
        ExpensesActions.setFilters,
        (
            state,
            {
                nameFilter,
                descFilter,
                amountFilter,
                priceFilter,
                dateSinceFilter,
                dateUntilFilter,
                filterTags,
                onlyShowUntagged,
                hideUntagged,
            },
        ) => {
            return {
                ...state,
                nameFilter,
                descFilter,
                amountFilter,
                priceFilter,
                dateSinceFilter,
                dateUntilFilter,
                filterTags,
                onlyShowUntagged,
                hideUntagged,
            };
        },
    ),
);

function calculateExpenseCounter(expenses: Expense[]) {
    let expenseCounter = -1;
    expenses.forEach((expense) => {
        if (expenseCounter < expense.ID) expenseCounter = expense.ID;
    });

    return expenseCounter;
}

function getStateFromLocalStorage() {
    const expensesSTR = localStorage.getItem(STORAGE_KEY);
    if (expensesSTR != null && expensesSTR != '') {
        console.log('Expenses database found');
        return JSON.parse(expensesSTR);
    } else {
        console.log('Expenses database NOT found');
        return {};
    }
}

function calculateInitialState() {
    let state: State = {
        expenses: [],
        expenseCounter: -1,
        editingExpense: DEFAULT_EXPENSE,
        editing: false,
        pageSize: 10,
        pageIndex: 0,
        nameFilter: '',
        descFilter: '',
        amountFilter: '',
        priceFilter: '',
        dateSinceFilter: undefined,
        dateUntilFilter: undefined,
        filterTags: [],
        onlyShowUntagged: false,
        hideUntagged: false,
    };
    state = { ...state, ...getStateFromLocalStorage() };
    state.expenseCounter = calculateExpenseCounter(state.expenses);

    state.expenses = state.expenses.map(
        (expense) =>
            new Expense(
                expense.ID,
                expense.name,
                expense.description,
                expense.amount,
                expense.pricePerUnit,
                expense.time,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                expense.tags.map((tag) => ((tag as any).ID as number) ?? tag), // TODO Eliminar map cuando todos los usuarios hayan migrado xd
            ),
    );
    return state;
}
