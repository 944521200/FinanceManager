import { Component, Input, OnInit } from '@angular/core';
import { Expense } from 'src/app/model/expense.model';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  constructor() { }

  @Input()
  expense!: Expense;
  ngOnInit(): void {
  }

}
