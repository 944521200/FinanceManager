import { Component, ElementRef, OnInit } from '@angular/core';
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

  nameSearch:string="";
  desSearch:string="";
  amountSearch:string="";
  priceSearch:string="";
  dateSinceSearch:Date | undefined;
  dateUntilSearch:Date | undefined;


  clearSearch()
  {
    this.nameSearch="";
    this.desSearch="";
    this.amountSearch="";
    this.priceSearch="";
    this.dateSinceSearch=undefined;
    this.dateUntilSearch=undefined;
  }

}
