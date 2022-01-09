import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Expense } from 'src/app/model/expense.model';
import { Tag } from 'src/app/model/tag.model';
import * as ExpensesSelector from '../store/expenses.selectors';
import * as TagsSelectors from '../../tags/store/tags.selectors';
import { MatSelectChange } from '@angular/material/select';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-search-expenses',
    templateUrl: './search-expenses.component.html',
    styleUrls: ['./search-expenses.component.css'],
})
export class SearchExpensesComponent implements OnInit {
    constructor(private store: Store) {}

    expenses: Observable<Expense[]> = of([]);

    allTags: Tag[] = [];
    toBeFilteredtags: Tag[] = [];
    filterTags: Tag[] = [];

    selectedTag: Tag | undefined;

    onlyUntagged = false;
    hideUntagged = false;

    ngOnInit(): void {
        this.expenses = this.store.select(ExpensesSelector.selectAllExpenses);
        this.store
            .select(TagsSelectors.selectAllTags)
            .pipe(take(1))
            .subscribe((tags) => {
                this.allTags = tags;
                this.toBeFilteredtags = tags;
                this.filterTags = [];
            });
    }

    nameSearch = '';
    desSearch = '';
    amountSearch = '';
    priceSearch = '';
    dateSinceSearch: Date | undefined;
    dateUntilSearch: Date | undefined;

    selectedTagsChanged(change: MatSelectChange) {
        this.filterTags.push(change.value);
        this.filterTags = [...this.filterTags];
        this.toBeFilteredtags = this.toBeFilteredtags.filter((tag) => tag.ID !== change.value.ID);
    }

    removeTag(tag: Tag) {
        this.toBeFilteredtags.push(tag);
        this.filterTags = [...this.filterTags.filter((filterTag) => filterTag.ID !== tag.ID)];
        this.selectedTag = undefined;
    }

    clearSearch() {
        this.nameSearch = '';
        this.desSearch = '';
        this.amountSearch = '';
        this.priceSearch = '';
        this.dateSinceSearch = undefined;
        this.dateUntilSearch = undefined;
        this.store
            .select(TagsSelectors.selectAllTags)
            .pipe(take(1))
            .subscribe((tags) => {
                this.allTags = tags;
                this.toBeFilteredtags = tags;
                this.filterTags = [];
            });
        this.selectedTag = undefined;
        this.onlyUntagged = false;
        this.hideUntagged = false;
    }
}
