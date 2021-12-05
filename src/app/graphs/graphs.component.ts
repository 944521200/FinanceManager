import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as AnalyticsSelectors from '../analytics/analytics.selectors';

@Component({
    selector: 'app-graphs',
    templateUrl: './graphs.component.html',
    styleUrls: ['./graphs.component.css'],
})
export class GraphsComponent implements OnInit, OnDestroy {
    constructor(private store: Store) {
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
                console.log('selected2', selected);
                const result: { [year: string]: number[] } = {};
                Object.keys(selected).forEach((year) => {
                    result[year] = Object.values(selected[+year]).map((selectedTag) => selectedTag.count);
                });
                return result;
            }),
        );
        this.selectedYears = this.store.select(AnalyticsSelectors.selectYearlyGroupedTags).pipe(
            map((selected) =>
                Object.keys(selected)
                    .filter((key) => Object.keys(selected[+key]).length > 0)
                    .map((key) => +key),
            ),
        );

        this.selectedYearlyMonthlyExpenses = this.store.select(AnalyticsSelectors.selectYearlyMonthlyExpenses).pipe(
            map((selected) => {
                const result: { [year: string]: number[] } = {};
                Object.keys(selected).forEach((year) => {
                    result[year] = Object.values(selected[+year]);
                });
                return result;
            }),
        );
    }

    subscriptions: Subscription[] = [];

    selectedYearTagsBgColors: Observable<{ [year: string]: string[] }>;
    selectedYearTagsData: Observable<{ [year: string]: number[] }>;
    selectedYearTagsLabels: Observable<{ [year: string]: string[] }>;
    selectedYears: Observable<number[]>;

    selectedYearlyMonthlyExpenses: Observable<{ [year: string]: number[] }>;

    ngOnInit(): void {
        this.subscriptions.push(
            this.store.select(AnalyticsSelectors.selectYearlyGroupedTags).subscribe((selected) => {
                console.log('selected', selected);
                // this.charts.push(
                //     new Chart(document.getElementById('expensesByTag') as ChartItem, {
                //         type: 'doughnut',
                //         data: {
                //             labels: Object.values(selected[2021]).map((selectedTag) => selectedTag.tag.name),
                //             datasets: [
                //                 {
                //                     label: 'My First Dataset',
                //                     data: Object.values(selected[2021]).map((selectedTag) => selectedTag.count),
                //                     backgroundColor: Object.values(selected[2021]).map(
                //                         (selectedTag) => selectedTag.tag.bgColor,
                //                     ),
                //                     hoverOffset: 4,
                //                 },
                //             ],
                //         },
                //     }),
                // );
            }),
        );

        this.subscriptions.push(
            this.store.select(AnalyticsSelectors.selectYearlyMonthlyExpenses).subscribe((selected) => {
                console.log('selected', selected);
                // this.charts.push(
                //     new Chart(document.getElementById('expenesByMonth') as ChartItem, {
                //         type: 'bar',
                //         data: {
                //             datasets: [
                //                 {
                //                     label: 'Monthly Expenses',
                //                     data: Object.values(selected[2021]),
                //                     backgroundColor: [
                //                         '#DD6E6E',
                //                         '#6EA4DD',
                //                         '#5AD39F',
                //                         '#E7E887',
                //                         '#DD6E6E',
                //                         '#6EA4DD',
                //                         '#5AD39F',
                //                         '#E7E887',
                //                         '#DD6E6E',
                //                         '#6EA4DD',
                //                         '#5AD39F',
                //                         '#E7E887',
                //                     ],
                //                 },
                //             ],
                //             labels: [
                //                 'January',
                //                 'February',
                //                 'March',
                //                 'April',
                //                 'May',
                //                 'June',
                //                 'July',
                //                 'August',
                //                 'September',
                //                 'October',
                //                 'November',
                //                 'December',
                //             ],
                //         },
                //         options: {
                //             scales: {
                //                 y: {
                //                     beginAtZero: true,
                //                 },
                //             },
                //         },
                //     }),
                // );
            }),
        );
    }

    ngOnDestroy(): void {
        // this.charts.forEach((chart) => chart.destroy());
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
}
