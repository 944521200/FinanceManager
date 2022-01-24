import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Chart, ChartItem, registerables } from 'chart.js';
import { selectNightMode } from 'src/app/settings/store/settings.selectors';

export const LIGHT_COLOR = '#EEEEEE';
export const DARK_COLOR = '#444444';
@UntilDestroy()
@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent {
    color = LIGHT_COLOR;
    constructor(private store: Store) {
        this.store
            .select(selectNightMode)
            .pipe(untilDestroyed(this))
            .subscribe((nightmode) => {
                this.color = nightmode ? LIGHT_COLOR : DARK_COLOR;
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (this.chart) this.chart.update();
            });
    }

    @Input('labels') set labels(value: string[]) {
        this._labels = value;
        if (this.chart !== undefined) {
            this.chart.data.labels = value;
            this.chart.update();
        }
    }
    _labels!: string[];

    @Input('data') set data(value: number[]) {
        this._data = value;
        if (this.chart !== undefined) {
            this.chart.data.datasets[0].data = value;
            this.chart.update();
        }
    }
    _data!: number[];

    @ViewChild('pr_chart') chartElementRef!: ElementRef;
    chart!: Chart;

    ngAfterViewInit(): void {
        setTimeout(() => {
            Chart.register(...registerables);
            this.chart = new Chart(this.chartElementRef.nativeElement as ChartItem, {
                type: 'bar',
                data: {
                    datasets: [
                        {
                            label: 'Expenses',
                            data: this._data,
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
                    labels: this._labels,
                },
                options: {
                    color: () => this.color,

                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: () => this.color,
                            },
                            grid: {
                                color: () => this.color,
                            },
                        },
                        x: {
                            ticks: {
                                color: () => this.color,
                            },
                            grid: {
                                color: () => this.color,
                            },
                        },
                    },
                },
            });
        });
    }
}
