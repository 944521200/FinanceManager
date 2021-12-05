import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GraphComponent } from './graph.component';
import { GraphsRoutingModule } from './graphs-routing.module';

@NgModule({
    declarations: [GraphComponent],
    imports: [CommonModule, GraphsRoutingModule],
    exports: [GraphComponent],
})
export class GraphsModule {}
