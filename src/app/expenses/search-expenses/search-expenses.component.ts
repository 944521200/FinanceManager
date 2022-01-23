/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Expense } from 'src/app/model/expense.model';
import { Tag } from 'src/app/model/tag.model';
import * as TagsSelectors from '../../tags/store/tags.selectors';
import { setFilters, setPagination } from '../store/expenses.actions';
import * as ExpensesSelector from '../store/expenses.selectors';

@UntilDestroy()
@Component({
    selector: 'app-search-expenses',
    templateUrl: './search-expenses.component.html',
    styleUrls: ['./search-expenses.component.css'],
})
export class SearchExpensesComponent implements OnInit {
    constructor(private store: Store) {}

    filteredExpenses!: Observable<Expense[]>;
    paginatedExpenses!: Observable<Expense[]>;

    allTags: Tag[] = [];
    toBeFilteredtags: Tag[] = [];
    filterTags: Tag[] = [];

    pageSize!: Observable<number>;
    pageIndex!: Observable<number>;
    searchExpenseForm!: FormGroup;

    pageSizeOptions = [5, 10, 25, 50];

    ngOnInit(): void {
        this.searchExpenseForm = new FormGroup({
            name: new FormControl(),
            description: new FormControl(),
            amount: new FormControl(),
            price: new FormControl(),
            dateFrom: new FormControl(),
            dateTo: new FormControl(),
            onlyUntagged: new FormControl(),
            hideUntagged: new FormControl(),
        });
        this.store
            .select(TagsSelectors.selectAllTags)
            .pipe(take(1))
            .subscribe((tags) => {
                this.allTags = tags;
                this.toBeFilteredtags = tags;
                this.filterTags = [];
            });

        this.pageSize = this.store.select(ExpensesSelector.selectPaginationSettings).pipe(
            untilDestroyed(this),
            map((settings) => settings.pageSize),
        );
        this.pageIndex = this.store.select(ExpensesSelector.selectPaginationSettings).pipe(
            untilDestroyed(this),
            map((settings) => settings.pageIndex),
        );
        this.searchExpenseForm.valueChanges.pipe(untilDestroyed(this)).subscribe(() => this.updateFilters());

        this.searchExpenseForm.controls['onlyUntagged'].valueChanges.pipe(untilDestroyed(this)).subscribe(() => {
            if (this.searchExpenseForm.controls['onlyUntagged'].value)
                this.searchExpenseForm.controls['hideUntagged'].disable({ emitEvent: false });
            else this.searchExpenseForm.controls['hideUntagged'].enable({ emitEvent: false });
        });
        this.searchExpenseForm.controls['hideUntagged'].valueChanges.pipe(untilDestroyed(this)).subscribe(() => {
            if (this.searchExpenseForm.controls['hideUntagged'].value)
                this.searchExpenseForm.controls['onlyUntagged'].disable({ emitEvent: false });
            else this.searchExpenseForm.controls['onlyUntagged'].enable({ emitEvent: false });
        });

        this.paginatedExpenses = this.store.select(ExpensesSelector.selectPaginatedExpenses).pipe(untilDestroyed(this));
        this.filteredExpenses = this.store.select(ExpensesSelector.selectFilteredExpenses).pipe(untilDestroyed(this));
    }

    updateFilters() {
        this.store.dispatch(
            setFilters({
                amountFilter: this.searchExpenseForm.value['amount'] ?? '',
                descFilter: this.searchExpenseForm.value['description'] ?? '',
                nameFilter: this.searchExpenseForm.value['name'] ?? '',
                priceFilter: this.searchExpenseForm.value['price'] ?? '',
                dateSinceFilter: this.searchExpenseForm.value['dateFrom'],
                dateUntilFilter: this.searchExpenseForm.value['dateTo'],
                filterTags: this.filterTags.map((tag) => tag.ID) ?? [],
                hideUntagged: this.searchExpenseForm.value['hideUntagged'] ?? false,
                onlyShowUntagged: this.searchExpenseForm.value['onlyUntagged'] ?? false,
            }),
        );
    }

    selectedTagsChanged(change: MatSelectChange) {
        this.filterTags = [...this.filterTags, change.value];
        this.toBeFilteredtags = [...this.toBeFilteredtags.filter((tag) => tag.ID !== change.value.ID)];
        this.updateFilters();
    }

    removeTag(tag: Tag) {
        this.toBeFilteredtags = [...this.toBeFilteredtags, { ...tag }];
        this.filterTags = [...this.filterTags.filter((filterTag) => filterTag.ID !== tag.ID)];
        this.updateFilters();
    }

    clearSearch() {
        this.searchExpenseForm.reset();
        this.store
            .select(TagsSelectors.selectAllTags)
            .pipe(take(1))
            .subscribe((tags) => {
                this.allTags = tags;
                this.toBeFilteredtags = tags.map((tag) => ({ ...tag }));
                this.filterTags = [];
            });
    }

    handlePageEvent(event: PageEvent) {
        this.store.dispatch(setPagination({ pageSize: event.pageSize, pageIndex: event.pageIndex }));
    }
}
