import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Chart, ChartItem, registerables } from 'chart.js';
import { ReportService } from '../services/report.service';
Chart.register(...registerables);

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent {
  constructor() {}

  columnDefs: ColDef[] = [
    { field: 'make',autoHeight:true,sortable:true,flex:3},
    { field: 'model',autoHeight:true,sortable:true,flex:2 },
    { field: 'price',autoHeight:true,sortable:true,flex:2 },
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
  ];
}
