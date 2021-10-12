import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Expense } from '../model/expense.model';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  constructor(private expenseService:ExpenseService) { }

  ngOnInit(): void 
  {
    
  }
 

}
