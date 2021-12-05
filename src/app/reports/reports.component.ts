import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.css'],
})
export class ReportsComponent {
    columnDefs: ColDef[] = [
        { field: 'make', autoHeight: true, sortable: true, flex: 3 },
        { field: 'model', autoHeight: true, sortable: true, flex: 2 },
        { field: 'price', autoHeight: true, sortable: true, flex: 2 },
    ];

    rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 },
    ];
}
