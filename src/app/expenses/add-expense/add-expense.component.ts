import { DatePipe } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Expense } from 'src/app/model/expense.model';
import { Tag } from 'src/app/model/tag.model';
import { EventEmitter } from '@angular/core';
import * as TagsSelectors from '../../tags/store/tags.selectors';
import * as ExpensesActions from '../store/expenses.actions';
import * as ExpensesSelector from '../store/expenses.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    selector: 'app-add-expense',
    templateUrl: './add-expense.component.html',
    styleUrls: ['./add-expense.component.css'],
})
export class AddExpenseComponent implements OnInit {
    expenseForm!: FormGroup;
    isEditing!: Observable<boolean>;

    editingExpense!: Observable<Expense>;
    allTags!: Observable<Tag[]>;
    toBeAddedTags!: Observable<Tag[]>;
    expenseTags!: Observable<Tag[]>;

    @Output()
    toggleTab: EventEmitter<never> = new EventEmitter<never>();

    constructor(private store: Store, private datePipe: DatePipe) {}

    ngOnInit() {
        this.expenseForm = new FormGroup({
            name: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
            description: new FormControl(null, [Validators.maxLength(250)]),
            date: new FormControl(new Date(), [Validators.required]),
            amount: new FormControl(1, [Validators.required, this.positiveNumber.bind(this)]),
            price: new FormControl(null, [Validators.required, this.positiveNumber.bind(this)]),
        });

        this.isEditing = this.store.select(ExpensesSelector.selectEditing).pipe(untilDestroyed(this));

        this.editingExpense = this.store.select(ExpensesSelector.selectEditingExpense).pipe(untilDestroyed(this));

        this.editingExpense.subscribe((editingExpense) => {
            this.expenseForm.reset({
                name: editingExpense.name,
                description: editingExpense.description,
                amount: editingExpense.amount,
                date: this.datePipe.transform(editingExpense.time, 'yyyy-MM-ddThh:mm:ss'),
                price: editingExpense.pricePerUnit,
            });
        });

        this.allTags = this.store.select(TagsSelectors.selectAllTags).pipe(untilDestroyed(this));
        this.toBeAddedTags = this.allTags.pipe(
            switchMap((tags) => {
                return this.editingExpense.pipe(
                    map((expense) => {
                        return [
                            ...tags.filter((tobeTag) => !expense.tags.includes(tobeTag.ID)).map((tag) => ({ ...tag })),
                        ];
                    }),
                );
            }),
        );
        this.expenseTags = this.allTags.pipe(
            switchMap((tags) => {
                return this.editingExpense.pipe(
                    map((expense) => {
                        return [...tags.filter((tobeTag) => expense.tags.includes(tobeTag.ID))];
                    }),
                );
            }),
        );
        this.store.dispatch(ExpensesActions.editExpense({ editId: -1 }));
    }

    positiveNumber(control: AbstractControl): ValidationErrors | null {
        if (isNaN(+control.value) || +control.value < 1) {
            return { notValidNumber: 'not a valid number' };
        }
        return null;
    }

    addExpense() {
        this.updateExpense();
        this.store.dispatch(ExpensesActions.confirmEditingExpense());
        this.toggleTab.emit();
        this.expenseForm.markAsPristine();
    }

    updateExpense() {
        this.store.dispatch(
            ExpensesActions.updateEditingExpense({
                name: this.expenseForm.value['name'],
                description: this.expenseForm.value['description'],
                amount: +this.expenseForm.value['amount'],
                pricePerUnit: this.expenseForm.value['price'],
                time: new Date(this.expenseForm.value['date']),
            }),
        );
    }

    clearExpense() {
        this.store.dispatch(ExpensesActions.discardEditingExpense());
        this.toggleTab.emit();
        this.expenseForm.markAsPristine();
    }

    removeTag(tag: number) {
        this.updateExpense();
        this.store.dispatch(ExpensesActions.removeTagEditingExpense({ tagId: tag }));
    }

    selectedTagsChanged(change: MatSelectChange) {
        this.updateExpense();
        this.store.dispatch(ExpensesActions.addTagsEditingExpense({ tags: [change.value.ID] }));
    }
}
