import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Expense } from 'src/app/model/expense.model';
import * as ExpensesActions from '../store/expenses.actions';

@Component({
    selector: 'app-expense',
    templateUrl: './expense.component.html',
    styleUrls: ['./expense.component.css'],
})
export class ExpenseComponent implements OnInit {
    constructor(private store: Store) {}

    @Input()
    expense!: Expense;
    dateString = '';

    ngOnInit(): void {
        const date: Date = new Date(this.expense.time);
        this.dateString = date.toLocaleDateString();
    }

    deleteExpense() {
        this.store.dispatch(ExpensesActions.deleteExpense({ deleteId: this.expense.ID }));
    }

    editExpense() {
        this.store.dispatch(ExpensesActions.editExpense({ editId: this.expense.ID }));
    }
}
