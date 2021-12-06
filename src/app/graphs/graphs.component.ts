import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
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
        this.selectedYears = this.store.select(AnalyticsSelectors.selectYearlyMonthlyExpenses).pipe(
            map((selected) =>
                Object.keys(selected)
                    .filter((key) => {
                        let sum = 0;
                        Object.keys(selected[+key]).forEach((month) => {
                            sum += selected[+key][+month];
                        });
                        return sum != 0;
                    })
                    .map((key) => +key),
            ),
        );

        this.selectedYearsWithMonths = this.store.select(AnalyticsSelectors.selectYearlyMonthlyExpenses).pipe(
            map((selected) => {
                const result: { [year: string]: number[] } = {};
                Object.keys(selected)
                    .filter((key) => {
                        let sum = 0;
                        Object.keys(selected[+key]).forEach((month) => {
                            sum += selected[+key][+month];
                        });
                        return sum != 0;
                    })
                    .forEach((year) => {
                        result[+year] = Object.keys(selected[+year])
                            .filter((month) => selected[+year][+month] > 0)
                            .map((month) => +month);
                    });

                return result;
            }),
        );

        // YEAR DONUT DATA
        this.selectedYearTagsBgColors = this.store.select(AnalyticsSelectors.selectYearlyGroupedTags).pipe(
            map((selected) => {
                const result: { [year: string]: string[] } = {};
                Object.keys(selected).map((year) => {
                    result[year] = Object.values(selected[+year]).map((selectedTag) => selectedTag.tag.bgColor);
                });
                return result;
            }),
        );

        this.selectedYearTagsLabels = this.store.select(AnalyticsSelectors.selectYearlyGroupedTags).pipe(
            map((selected) => {
                const result: { [year: string]: string[] } = {};
                Object.keys(selected).map((year) => {
                    result[year] = Object.values(selected[+year]).map((selectedTag) => selectedTag.tag.name);
                });
                return result;
            }),
        );

        this.selectedYearTagsData = this.store.select(AnalyticsSelectors.selectYearlyGroupedTags).pipe(
            map((selected) => {
                const result: { [year: string]: number[] } = {};
                Object.keys(selected).forEach((year) => {
                    result[year] = Object.values(selected[+year]).map((selectedTag) => selectedTag.count);
                });
                return result;
            }),
        );

        // YEAR TABLE DATA
        this.selectedYearlyMonthlyExpenses = this.store.select(AnalyticsSelectors.selectYearlyMonthlyExpenses).pipe(
            map((selected) => {
                const result: { [year: string]: number[] } = {};
                Object.keys(selected).forEach((year) => {
                    result[year] = Object.values(selected[+year]);
                });
                return result;
            }),
        );

        // MONTLY DONUT DATA
        this.selectedYearMonthTagsData = this.store.select(AnalyticsSelectors.selectYearlyMonthlyGroupedTags).pipe(
            map((selected) => {
                const result: { [year: string]: { [month: string]: number[] } } = {};
                Object.keys(selected).forEach((year) => {
                    Object.keys(selected[+year]).forEach((month) => {
                        if (result[year] === undefined) result[year] = {};
                        result[year][month] = Object.values(selected[+year][+month]).map(
                            (selectedTag) => selectedTag.count,
                        );
                    });
                });
                return result;
            }),
        );

        this.selectedYearMonthTagsBgColors = this.store.select(AnalyticsSelectors.selectYearlyMonthlyGroupedTags).pipe(
            map((selected) => {
                const result: { [year: string]: { [month: string]: string[] } } = {};
                Object.keys(selected).forEach((year) => {
                    Object.keys(selected[+year]).forEach((month) => {
                        if (result[year] === undefined) result[year] = {};
                        result[year][month] = Object.values(selected[+year][+month]).map(
                            (selectedTag) => selectedTag.tag.bgColor,
                        );
                    });
                });
                return result;
            }),
        );

        this.selectedYearMonthTagsLabels = this.store.select(AnalyticsSelectors.selectYearlyMonthlyGroupedTags).pipe(
            map((selected) => {
                const result: { [year: string]: { [month: string]: string[] } } = {};
                Object.keys(selected).forEach((year) => {
                    Object.keys(selected[+year]).forEach((month) => {
                        if (result[year] === undefined) result[year] = {};
                        result[year][month] = Object.values(selected[+year][+month]).map(
                            (selectedTag) => selectedTag.tag.name,
                        );
                    });
                });
                return result;
            }),
        );

        //MONTHLY TABLE DATA
        this.selectedYearlyMonthlyDailyExpenses = this.store
            .select(AnalyticsSelectors.selectYearlyMonthlyDailyExpenses)
            .pipe(
                map((selected) => {
                    const result: { [year: string]: { [month: string]: number[] } } = {};
                    Object.keys(selected).forEach((year) => {
                        Object.keys(selected[+year]).forEach((month) => {
                            if (result[year] === undefined) result[year] = {};
                            result[year][month] = Object.values(selected[+year][+month]);
                        });
                    });
                    return result;
                }),
            );
        this.selectedYearlyMonthlyDailyLabels = this.store
            .select(AnalyticsSelectors.selectYearlyMonthlyDailyExpenses)
            .pipe(
                map((selected) => {
                    const result: { [year: string]: { [month: string]: string[] } } = {};
                    Object.keys(selected).forEach((year) => {
                        Object.keys(selected[+year]).forEach((month) => {
                            if (result[year] === undefined) result[year] = {};
                            result[year][month] = Object.keys(selected[+year][+month]);
                        });
                    });
                    return result;
                }),
            );

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
    selectedYearTagsBgColors: Observable<{ [year: string]: string[] }>;
    selectedYearTagsData: Observable<{ [year: string]: number[] }>;
    selectedYearTagsLabels: Observable<{ [year: string]: string[] }>;

    //DONUT MONTHLY DATA
    selectedYearMonthTagsBgColors: Observable<{ [year: string]: { [month: string]: string[] } }>;
    selectedYearMonthTagsData: Observable<{ [year: string]: { [month: string]: number[] } }>;
    selectedYearMonthTagsLabels: Observable<{ [year: string]: { [month: string]: string[] } }>;

    //TABLE YEAR DATA
    selectedYearlyMonthlyExpenses: Observable<{ [year: string]: number[] }>;

    //TABLE MONTHLY DATA
    selectedYearlyMonthlyDailyExpenses: Observable<{ [year: number]: { [month: number]: number[] } }>;
    selectedYearlyMonthlyDailyLabels: Observable<{ [year: number]: { [month: number]: string[] } }>;

    //FORM
    analyticsForm: FormGroup;

    resetInterval() {
        this.analyticsForm.reset({
            dateFrom: this.datePipe.transform(new Date(new Date().getFullYear() + '/01/01'), 'yyyy-MM-dd'),
            dateTo: this.datePipe.transform(new Date(new Date().getFullYear() + '/12/31'), 'yyyy-MM-dd'),
        });
    }
}
