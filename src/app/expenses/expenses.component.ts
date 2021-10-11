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

  constructor(private expenseService:ExpenseService,
    private formBuilder: FormBuilder,) { }



  expenseForm = this.formBuilder.group({
    name: '',
    description: '',
    amount:'',
    pricePerUnit:''
  });

  expenses:Expense[]=[];
  

  ngOnInit(): void 
  {
    this.expenses = this.expenseService.getExpenses();
    this.expenseService.expensesChanged.subscribe((expenses)=>this.expenses=expenses);
  }
  
  addExpense()
  {
    //console.log(this.nameInput+" - "+this.descInput+" - "+this.amountInput)
    console.log(this.expenseForm.value)
    
    this.expenseService.AddExpense(this.expenseForm.value['name'],this.expenseForm.value['description'],+this.expenseForm.value['amount'],this.expenseForm.value['pricePerUnit'],[])

    /*this.nameInput ="";
    this.descInput="";
    this.amountInput="";*/
    this.expenseForm.reset();
  }

}
