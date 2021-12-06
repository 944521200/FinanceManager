import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { GraphsComponent } from './graphs.component';
import { GraphsRoutingModule } from './graphs-routing.module';
import { DonutGraphComponent } from './donut-graph/donut-graph.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [GraphsComponent, DonutGraphComponent, DonutGraphComponent, BarChartComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, GraphsRoutingModule],
    providers: [DatePipe],
    exports: [GraphsComponent],
})
export class GraphsModule {}
