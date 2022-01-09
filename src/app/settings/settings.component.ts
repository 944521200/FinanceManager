import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { overrideAnalyticsSettings } from '../analytics/analytics.actions';
import { selectAnalyticsState } from '../analytics/analytics.selectors';
import { overrideExpenses } from '../expenses/store/expenses.actions';
import { selectAllExpenses } from '../expenses/store/expenses.selectors';
import { Expense } from '../model/expense.model';
import { Tag } from '../model/tag.model';
import { overrideTags } from '../tags/store/tags.actions';
import { selectAllTags } from '../tags/store/tags.selectors';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
    constructor(private store: Store, private sanitizer: DomSanitizer, private datePipe: DatePipe) {}

    sanitizedBlobUrl!: SafeUrl;
    filename!: string;

    @ViewChild('downloadLink')
    downloadLink!: ElementRef;

    @ViewChild('importDialog')
    importDialog!: ElementRef;

    exportData() {
        console.log('exportin');
        forkJoin([
            this.store.select(selectAllExpenses).pipe(take(1)),
            this.store.select(selectAllTags).pipe(take(1)),
            this.store.select(selectAnalyticsState).pipe(take(1)),
        ]).subscribe(([expenses, tags, analyticsSettings]) => {
            const data = {
                expenses,
                tags,
                analytics: analyticsSettings,
            };
            const exporting = JSON.stringify(data, null, 2);

            const blob = new Blob([exporting], { type: 'application/json' });
            this.sanitizedBlobUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
            this.filename = `ExpenseData_${this.datePipe.transform(new Date(), 'yyyy/M/d-H:mm:ss-SSS')}.json`;
            setTimeout(() => {
                this.downloadLink.nativeElement.click();
            });
        });
    }

    importData() {
        this.importDialog.nativeElement.click();
    }

    fileImported() {
        const file = this.importDialog.nativeElement.files[0];

        if (file !== null && file !== undefined) {
            const fileReader = new FileReader();
            fileReader.readAsBinaryString(file);
            fileReader.onloadend = () => {
                if (fileReader.result !== undefined && fileReader.result !== null) {
                    const data: { expenses: Expense[]; tags: Tag[]; analytics: { fromDate: Date; toDate: Date } } =
                        JSON.parse(fileReader.result.toString());
                    this.store.dispatch(overrideExpenses({ expenses: data.expenses }));
                    this.store.dispatch(overrideTags({ tags: data.tags }));
                    this.store.dispatch(overrideAnalyticsSettings({ settings: data.analytics }));
                }
            };
        }
    }
}
