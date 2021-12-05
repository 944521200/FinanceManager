import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart, ChartItem, registerables } from 'chart.js';

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent {
    @Input()
    data!: number[];

    @ViewChild('pr_chart') chartElementRef!: ElementRef;

    ngAfterViewInit(): void {
        Chart.register(...registerables);
        new Chart(this.chartElementRef.nativeElement as ChartItem, {
            type: 'bar',
            data: {
                datasets: [
                    {
                        label: 'Monthly Expenses',
                        data: this.data,
                        backgroundColor: [
                            '#DD6E6E',
                            '#6EA4DD',
                            '#5AD39F',
                            '#E7E887',
                            '#DD6E6E',
                            '#6EA4DD',
                            '#5AD39F',
                            '#E7E887',
                            '#DD6E6E',
                            '#6EA4DD',
                            '#5AD39F',
                            '#E7E887',
                        ],
                    },
                ],
                labels: [
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
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }
}
