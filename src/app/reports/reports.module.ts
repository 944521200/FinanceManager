import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { ReportComponent } from './report.component';
import { ReportsRoutingModule } from './reports-routing.module';

@NgModule({
    declarations: [ReportComponent],
    imports: [CommonModule, ReportsRoutingModule, AgGridModule.withComponents([])],
    exports: [ReportComponent],
})
export class ReportsModule {}
