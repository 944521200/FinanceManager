import { Component, Input, OnInit } from '@angular/core';
import { Expense } from 'src/app/model/expense.model';
import { ExpenseService } from 'src/app/services/expense.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  constructor(private expenseService:ExpenseService, private tagService:TagService) { }

  @Input()
  expense!: Expense;
  dateString:string='';
  ngOnInit(): void {
    console.log(this.expense)
    const date:Date =new Date(this.expense.time);
   this.dateString=date.toLocaleDateString();

  }
  

  deleteExpense()
  {
    this.expenseService.removeExpense(this.expense.ID);
  }

  editExpense()
  {
    this.expenseService.editingExpense.next(this.expense.ID);
  }

  getTagWithID(ID:number)
  {
    return this.tagService.getTag(ID);
  }

}
