import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GraphsComponent } from './graphs.component';
import { GraphsRoutingModule } from './graphs-routing.module';

@NgModule({
    declarations: [GraphsComponent],
    imports: [CommonModule, GraphsRoutingModule],
    exports: [GraphsComponent],
})
export class GraphsModule {}
