import { Component, OnInit } from '@angular/core';
import { Chart, ChartItem } from 'chart.js';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor(private reportService:ReportService) { }

/**
 * 
 *  un gráfico que muestre el menor y mayor gasto mensual de cada tag o de cada expense
 * 
 */
 ngOnInit(): void {

  var expensesChart = new Chart(document.getElementById('expenesByMonth') as ChartItem,{
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June','July','August','September','October','November','December'],
      datasets: [
        {
          label: 'Expenses by month',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: this.reportService.getMonthlyExpenses(2021),
        },
      ],
    },
    options: {},
  });

  var expensesByTag =  new Chart(document.getElementById('expensesByTag') as ChartItem,{
    type: 'doughnut',
    data: {
      labels: [
        'anime',
        'food',
        'games'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    },
  });
  
  var topExpenses = new Chart(document.getElementById('topExpenses') as ChartItem,{
    type: 'bar',
    data: {
      labels: ['Audi a4', 'Gaming gamer chair','dick enhancement', 'konosuba bluray', 'HDD','webcam','boli bic'],
      datasets: [{
        label: 'My First Dataset',
        data: [20000, 800, 400, 180, 56, 55, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  });



}

}
