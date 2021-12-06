import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as AnalyticsSelectors from '../analytics/analytics.selectors';
import * as AnalyticsActions from '../analytics/analytics.actions';

@Component({
    selector: 'app-graphs',
    templateUrl: './graphs.component.html',
    styleUrls: ['./graphs.component.css'],
})
export class GraphsComponent {
    constructor(private store: Store, private datePipe: DatePipe) {
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

        this.selectedYearlyMonthlyExpenses = this.store.select(AnalyticsSelectors.selectYearlyMonthlyExpenses).pipe(
            map((selected) => {
                const result: { [year: string]: number[] } = {};
                Object.keys(selected).forEach((year) => {
                    result[year] = Object.values(selected[+year]);
                });
                // console.log('selected33', result);
                return result;
            }),
        );

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

    selectedYearTagsBgColors: Observable<{ [year: string]: string[] }>;
    selectedYearTagsData: Observable<{ [year: string]: number[] }>;
    selectedYearTagsLabels: Observable<{ [year: string]: string[] }>;
    selectedYears: Observable<number[]>;

    selectedYearlyMonthlyExpenses: Observable<{ [year: string]: number[] }>;

    analyticsForm: FormGroup;

    resetInterval() {
        this.analyticsForm.reset({
            dateFrom: this.datePipe.transform(new Date(new Date().getFullYear() + '/01/01'), 'yyyy-MM-dd'),
            dateTo: this.datePipe.transform(new Date(new Date().getFullYear() + '/12/31'), 'yyyy-MM-dd'),
        });
    }
}
