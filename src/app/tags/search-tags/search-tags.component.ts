import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Tag } from 'src/app/model/tag.model';
import * as TagsSelectors from '../store/tags.selectors';

@Component({
    selector: 'app-search-tags',
    templateUrl: './search-tags.component.html',
    styleUrls: ['./search-tags.component.css'],
})
export class SearchTagsComponent implements OnInit {
    constructor(private store: Store) {}

    nameSearch = '';
    desSearch = '';
    dateSinceSearch: Date | undefined;
    dateUntilSearch: Date | undefined;

    tags: Observable<Tag[]> = of([]);

    ngOnInit(): void {
        this.tags = this.store.select(TagsSelectors.selectAllTags);
    }

    clearSearch() {
        this.nameSearch = '';
        this.desSearch = '';
        this.dateSinceSearch = undefined;
        this.dateUntilSearch = undefined;
    }
}
