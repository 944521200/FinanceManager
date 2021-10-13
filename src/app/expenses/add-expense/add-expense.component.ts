import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {

  constructor(private expenseService:ExpenseService) { }

  expenseForm!: FormGroup;

  ngOnInit(): void 
  {
    this.expenseForm =  new FormGroup(
      {
        'name':new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(30)]),
        'description':new FormControl(null,[Validators.maxLength(250)]),
        'amount':new FormControl(1,[Validators.required, this.positiveNumber.bind(this)]),
        'price': new FormControl(null,[Validators.required, this.positiveNumber.bind(this)])
      })

  } 
  
  positiveNumber(control:AbstractControl):ValidationErrors | null
  {
    if(isNaN(+control.value) || +control.value<1)
    {
      control.setValue(1);
     // this.expenseForm.patchValue({control.:1});
      return null;
    }
    return null;
  }

  addExpense()
  {
    console.log(this.expenseForm)
    this.expenseService.addExpense(this.expenseForm.value['name'],this.expenseForm.value['description'],+this.expenseForm.value['amount'],this.expenseForm.value['pricePerUnit'],[])
    this.clearForm()
  }

  clearForm()
  {this.expenseForm.reset()}


}
