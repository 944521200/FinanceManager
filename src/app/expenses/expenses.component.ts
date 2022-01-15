import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { selectEditingExpense } from './store/expenses.selectors';

@UntilDestroy()
@Component({
    selector: 'app-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent implements OnInit {
    currentTabIndex = 0;

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.store
            .select(selectEditingExpense)
            .pipe(untilDestroyed(this))
            .subscribe((editingExpense) => {
                if (editingExpense.ID != -1 && this.currentTabIndex === 0) this.toggleTab();
            });
    }

    toggleTab() {
        this.currentTabIndex = this.currentTabIndex === 0 ? 1 : 0;
    }
}
