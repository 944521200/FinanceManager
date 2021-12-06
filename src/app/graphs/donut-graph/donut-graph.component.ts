import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart, ChartItem, registerables } from 'chart.js';

@Component({
    selector: 'app-donut-graph',
    templateUrl: './donut-graph.component.html',
    styleUrls: ['./donut-graph.component.css'],
})
export class DonutGraphComponent {
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

    @Input('bgColor') set bgColor(value: string[]) {
        this._bgColor = value;
        if (this.chart !== undefined) {
            this.chart.data.datasets[0].backgroundColor = value;
            this.chart.update();
        }
    }
    _bgColor!: string[];

    @ViewChild('pr_chart') chartElementRef!: ElementRef;

    chart!: Chart;

    ngAfterViewInit(): void {
        Chart.register(...registerables);
        this.chart = new Chart(this.chartElementRef.nativeElement as ChartItem, {
            type: 'doughnut',
            data: {
                labels: this._labels,
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: this._data,
                        backgroundColor: this._bgColor,
                        hoverOffset: 4,
                    },
                ],
            },
        });
    }
}
