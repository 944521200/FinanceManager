import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    constructor(
        private store: Store,
        private sanitizer: DomSanitizer,
        private datePipe: DatePipe,
        private snackBar: MatSnackBar,
    ) {}

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
                this.snackBar.open('Your Data was exported successfully', 'Nice', {
                    duration: 5000,
                    verticalPosition: 'top',
                });
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
                let error = false;
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (fileReader.result) {
                    const data: { expenses: Expense[]; tags: Tag[]; analytics: { fromDate: Date; toDate: Date } } =
                        JSON.parse(fileReader.result.toString());
                    try {
                        data.expenses = data.expenses.map((expense) => {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            expense.tags = expense.tags.map((tag) => ((tag as any).ID as number) ?? tag);
                            return expense;
                        });
                        this.store.dispatch(overrideExpenses({ expenses: data.expenses }));
                    } catch (e) {
                        console.log('Error importing expenses');
                        error = true;
                    }
                    try {
                        this.store.dispatch(overrideTags({ tags: data.tags }));
                    } catch (e) {
                        console.log('Error importing tags');
                        error = true;
                    }
                    try {
                        this.store.dispatch(overrideAnalyticsSettings({ settings: data.analytics }));
                    } catch (e) {
                        console.log('Error importing analytics');
                        error = true;
                    }
                    const errorMessage = error
                        ? 'There were errors importing your data'
                        : 'Your Data was imported successfully';
                    this.snackBar.open(errorMessage, 'Nice', { duration: 5000, verticalPosition: 'top' });
                }
            };
        }
    }
}
