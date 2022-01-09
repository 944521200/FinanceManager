import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import * as AnalyticsSelectors from '../analytics/analytics.selectors';
import * as AnalyticsActions from '../analytics/analytics.actions';

@Component({
    selector: 'app-graphs',
    templateUrl: './graphs.component.html',
    styleUrls: ['./graphs.component.css'],
})
export class GraphsComponent {
    YEARLY_LABELS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    constructor(private store: Store, private datePipe: DatePipe) {
        // GENERAL DATA
        this.selectedYears = this.store.select(AnalyticsSelectors.selectSelectedYears);
        this.selectedYearsWithMonths = this.store.select(AnalyticsSelectors.selectSelectedYearsWithMonths);

        // YEAR DONUT DATA
        this.selectedYearTags = this.store.select(AnalyticsSelectors.selectYearlyTags);

        // YEAR TABLE DATA
        this.selectedYearlyMonthlyExpenses = this.store.select(AnalyticsSelectors.selectMonthlyExpensesPerYear);

        // MONTLY DONUT DATA
        this.selectedYearMonthTags = this.store.select(AnalyticsSelectors.SelectMontlyTagsPerYear);

        //MONTHLY TABLE DATA
        this.selectedYearlyMonthlyDailyExpenses = this.store.select(AnalyticsSelectors.selectDailyExpensesPerMonthYear);

        // FORM CONFIGURATION AND OTHERS
        this.analyticsForm = new FormGroup({
            dateFrom: new FormControl(
                this.datePipe.transform(new Date(new Date().getFullYear() + '/01/01'), 'yyyy-MM-dd'),
                [Validators.required],
            ),
            dateTo: new FormControl(
                this.datePipe.transform(new Date(new Date().getFullYear() + '/12/31'), 'yyyy-MM-dd'),
                [Validators.required],
            ),
        });
        this.analyticsForm.valueChanges.subscribe((test) => {
            this.store.dispatch(
                AnalyticsActions.setFromAndToDate({ fromDate: new Date(test.dateFrom), toDate: new Date(test.dateTo) }),
            );
        });
        this.store
            .select(AnalyticsSelectors.selectFromAndToDate)
            .pipe(take(1))
            .subscribe((FromToDate) => {
                this.analyticsForm.reset({
                    dateFrom: this.datePipe.transform(FromToDate.fromDate, 'yyyy-MM-dd'),
                    dateTo: this.datePipe.transform(FromToDate.toDate, 'yyyy-MM-dd'),
                });
            });
    }

    // GENERAL DATA
    selectedYears: Observable<number[]>;
    selectedYearsWithMonths: Observable<{ [year: string]: number[] }>;

    // DONUT YEAR DATA
    selectedYearTags: Observable<{ [year: number]: { labels: string[]; bgColor: string[]; count: number[] } }>;

    //DONUT MONTHLY DATA
    selectedYearMonthTags: Observable<{
        [year: string]: { [month: string]: { labels: string[]; count: number[]; bgColor: string[] } };
    }>;

    //TABLE YEAR DATA
    selectedYearlyMonthlyExpenses: Observable<{ [year: string]: number[] }>;

    //TABLE MONTHLY DATA
    selectedYearlyMonthlyDailyExpenses: Observable<{
        [year: string]: { [month: string]: { count: number[]; labels: string[] } };
    }>;

    //FORM
    analyticsForm: FormGroup;

    resetInterval() {
        this.analyticsForm.reset({
            dateFrom: this.datePipe.transform(new Date(new Date().getFullYear() + '/01/01'), 'yyyy-MM-dd'),
            dateTo: this.datePipe.transform(new Date(new Date().getFullYear() + '/12/31'), 'yyyy-MM-dd'),
        });
    }
}
