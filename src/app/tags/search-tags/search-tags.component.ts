import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tag } from 'src/app/model/tag.model';
import * as TagsActions from '../store/tags.actions';
import * as TagsSelectors from '../store/tags.selectors';

@UntilDestroy()
@Component({
    selector: 'app-search-tags',
    templateUrl: './search-tags.component.html',
    styleUrls: ['./search-tags.component.css'],
})
export class SearchTagsComponent implements OnInit {
    constructor(private store: Store) {}

    filteredTags!: Observable<Tag[]>;
    paginatedTags!: Observable<Tag[]>;

    pageSize!: Observable<number>;
    pageIndex!: Observable<number>;
    pageSizeOptions = [5, 10, 25, 50];

    searchTagsForm!: FormGroup;

    ngOnInit(): void {
        this.searchTagsForm = new FormGroup({
            name: new FormControl(),
            description: new FormControl(),
        });

        this.pageSize = this.store.select(TagsSelectors.selectPaginationSettings).pipe(
            untilDestroyed(this),
            map((settings) => settings.pageSize),
        );
        this.pageIndex = this.store.select(TagsSelectors.selectPaginationSettings).pipe(
            untilDestroyed(this),
            map((settings) => settings.pageIndex),
        );
        this.searchTagsForm.valueChanges.pipe(untilDestroyed(this)).subscribe(() => this.updateFilters());

        this.paginatedTags = this.store.select(TagsSelectors.selectPaginatedTags).pipe(untilDestroyed(this));
        this.filteredTags = this.store.select(TagsSelectors.selectFilteredTags).pipe(untilDestroyed(this));
    }

    updateFilters() {
        this.store.dispatch(
            TagsActions.setFilters({
                nameFilter: this.searchTagsForm.value['name'] ?? '',
                descFilter: this.searchTagsForm.value['description'] ?? '',
            }),
        );
    }

    clearSearch() {
        this.searchTagsForm.reset();
    }
    handlePageEvent(event: PageEvent) {
        this.store.dispatch(TagsActions.setPagination({ pageSize: event.pageSize, pageIndex: event.pageIndex }));
    }
}
