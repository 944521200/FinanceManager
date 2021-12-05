import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GraphsComponent } from './graphs.component';
import { GraphsRoutingModule } from './graphs-routing.module';
import { DonutGraphComponent } from './donut-graph/donut-graph.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@NgModule({
    declarations: [GraphsComponent, DonutGraphComponent, DonutGraphComponent, BarChartComponent],
    imports: [CommonModule, GraphsRoutingModule],
    exports: [GraphsComponent],
})
export class GraphsModule {}
