import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Expense } from 'src/app/model/expense.model';
import { DEFAULT_TAG, Tag } from 'src/app/model/tag.model';
import { selectAllTags } from 'src/app/tags/store/tags.selectors';
import * as ExpensesActions from '../store/expenses.actions';

@UntilDestroy()
@Component({
    selector: 'app-expense',
    templateUrl: './expense.component.html',
    styleUrls: ['./expense.component.css'],
})
export class ExpenseComponent implements OnInit {
    constructor(private store: Store) {}
    ngOnInit(): void {
        this.dateString = this.expense.time.toLocaleDateString();
        this.tags = this.store.select(selectAllTags).pipe(
            untilDestroyed(this),
            map((tags) => {
                return this.expense.tags.map((tagID) => {
                    return tags.find((atag) => atag.ID === tagID) ?? DEFAULT_TAG;
                });
            }),
        );
    }

    @Input()
    expense!: Expense;
    dateString = '';

    tags!: Observable<Tag[]>;

    deleteExpense() {
        this.store.dispatch(ExpensesActions.deleteExpense({ deleteId: this.expense.ID }));
    }

    editExpense() {
        this.store.dispatch(ExpensesActions.editExpense({ editId: this.expense.ID }));
    }
}
