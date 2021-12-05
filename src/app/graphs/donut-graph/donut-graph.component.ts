import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart, ChartItem, registerables } from 'chart.js';

@Component({
    selector: 'app-donut-graph',
    templateUrl: './donut-graph.component.html',
    styleUrls: ['./donut-graph.component.css'],
})
export class DonutGraphComponent {
    @Input()
    labels!: string[];

    @Input()
    data!: number[];

    @Input()
    bgColor!: string[];

    @ViewChild('pr_chart') chartElementRef!: ElementRef;

    ngAfterViewInit(): void {
        Chart.register(...registerables);
        new Chart(this.chartElementRef.nativeElement as ChartItem, {
            type: 'doughnut',
            data: {
                labels: this.labels,
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: this.data,
                        backgroundColor: this.bgColor,
                        hoverOffset: 4,
                    },
                ],
            },
        });
    }
}
