import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
})
export class AddExpenseComponent implements OnInit {
  constructor(private expenseService: ExpenseService) {}

  expenseForm!: FormGroup;
  editingIndex: number = -1;

  ngOnInit(): void {
    this.expenseForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
      description: new FormControl(null, [Validators.maxLength(250)]),
      amount: new FormControl(1, [
        Validators.required,
        this.positiveNumber.bind(this),
      ]),
      price: new FormControl(null, [
        Validators.required,
        this.positiveNumber.bind(this),
      ]),
    });

    this.expenseService.editingExpense.subscribe((editingExpenseIndex) => {
      if (editingExpenseIndex != -1) {
        //edit expense
        this.editingIndex = editingExpenseIndex;
        const editingExpense = this.expenseService.getExpense(this.editingIndex);
        console.log
        this.expenseForm.reset(
          {
            name:editingExpense.name,
            description:editingExpense.description,
            amount: editingExpense.amount,
            price:editingExpense.pricePerUnit
          });

      } else {
        //clear editing mode
        this.editingIndex = -1;
        this.clearForm();
      }
    });
  }

  positiveNumber(control: AbstractControl): ValidationErrors | null {
    if (isNaN(+control.value) || +control.value < 1) {
      //control.setValue(1);
      // this.expenseForm.patchValue({control.:1});
      // return null;
      return { notValidNumber: 'not a valid number' };
    }
    return null;
  }

  addExpense() {
    console.log(this.expenseForm);
    if (this.editingIndex != -1) {
      this.expenseService.udpateExpense(this.editingIndex, this.expenseForm.value['name'],
      this.expenseForm.value['description'],
      +this.expenseForm.value['amount'],
      this.expenseForm.value['price'],
      []);
      this.editingIndex = -1;
      this.clearForm();
    } else {
      this.expenseService.addExpense(
        this.expenseForm.value['name'],
        this.expenseForm.value['description'],
        +this.expenseForm.value['amount'],
        this.expenseForm.value['price'],
        []
      );
    }
    this.clearForm();
  }

  clearForm() {
    this.expenseForm.reset({ amount: 1 });
    this.editingIndex = -1;
  }
}
