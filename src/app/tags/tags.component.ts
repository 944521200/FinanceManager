import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { selectEditingTag } from './store/tags.selectors';

@UntilDestroy()
@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.css'],
})
export class TagsComponent implements OnInit {
    constructor(private store: Store) {}

    currentTabIndex = 0;

    ngOnInit(): void {
        this.store
            .select(selectEditingTag)
            .pipe(untilDestroyed(this))
            .subscribe((tag) => {
                this.currentTabIndex = tag.ID !== -1 ? 1 : 0;
            });
    }
}
