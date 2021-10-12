import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/model/expense.model';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-search-expenses',
  templateUrl: './search-expenses.component.html',
  styleUrls: ['./search-expenses.component.css']
})
export class SearchExpensesComponent implements OnInit {

  constructor(private expenseService:ExpenseService) { }

  expenses:Expense[]=[];
  ngOnInit(): void {
    this.expenses = this.expenseService.getExpenses();
    this.expenseService.expensesChanged.subscribe((expenses)=>this.expenses=expenses);
  }

}
