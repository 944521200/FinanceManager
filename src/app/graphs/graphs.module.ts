import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { GraphsComponent } from './graphs.component';
import { GraphsRoutingModule } from './graphs-routing.module';
import { DonutGraphComponent } from './donut-graph/donut-graph.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
    declarations: [GraphsComponent, DonutGraphComponent, DonutGraphComponent, BarChartComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, GraphsRoutingModule, MaterialModule],
    providers: [DatePipe],
    exports: [GraphsComponent],
})
export class GraphsModule {}
