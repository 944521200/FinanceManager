import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Expense } from 'src/app/model/expense.model';
import * as ExpensesSelector from '../store/expenses.selectors';

@Component({
    selector: 'app-search-expenses',
    templateUrl: './search-expenses.component.html',
    styleUrls: ['./search-expenses.component.css'],
})
export class SearchExpensesComponent implements OnInit {
    constructor(private store: Store) {}

    expenses: Observable<Expense[]> = of([]);

    ngOnInit(): void {
        this.expenses = this.store.select(ExpensesSelector.selectAllExpenses);
    }

    nameSearch = '';
    desSearch = '';
    amountSearch = '';
    priceSearch = '';
    dateSinceSearch: Date | undefined;
    dateUntilSearch: Date | undefined;

    clearSearch() {
        this.nameSearch = '';
        this.desSearch = '';
        this.amountSearch = '';
        this.priceSearch = '';
        this.dateSinceSearch = undefined;
        this.dateUntilSearch = undefined;
    }
}
