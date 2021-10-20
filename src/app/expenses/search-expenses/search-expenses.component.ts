import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Expense } from 'src/app/model/expense.model';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-search-expenses',
  templateUrl: './search-expenses.component.html',
  styleUrls: ['./search-expenses.component.css']
})
export class SearchExpensesComponent implements OnInit, OnDestroy {

  constructor(private expenseService:ExpenseService) { }


  expenses:Expense[]=[];

  private subscription!: Subscription;
  
  ngOnInit(): void {
    this.expenses = this.expenseService.getExpenses();
    this.subscription = this.expenseService.expensesChanged.subscribe((expenses)=>
    {
      this.expenses=expenses;
    });
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
   }

}
