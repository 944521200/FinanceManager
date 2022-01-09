import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { AgGridModule } from 'ag-grid-angular';

import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports-routing.module';

@NgModule({
    declarations: [ReportsComponent], //debería buscar otra más ligera para este proyecto.
    imports: [CommonModule, ReportsRoutingModule], //, AgGridModule.withComponents([])
    exports: [ReportsComponent],
})
export class ReportsModule {}
