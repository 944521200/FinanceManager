import { Component, Input, OnInit } from '@angular/core';
import { Expense } from 'src/app/model/expense.model';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  constructor(private expenseService:ExpenseService) { }

  @Input()
  expense!: Expense;
  dateString:string='';
  ngOnInit(): void {
    const date:Date =new Date(this.expense.time);
   this.dateString=date.toLocaleDateString()+ "-"+date.toLocaleTimeString();
  }
  

  deleteExpense()
  {
    this.expenseService.RemoveExpense(this.expense.ID);
  }

}
