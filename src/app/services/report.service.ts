import { Injectable } from '@angular/core';
import { ExpenseService } from './expense.service';
import { TagService } from './tag.service';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(
    private expenseService: ExpenseService,
    private tagService: TagService
  ) {}


  getMonthlyExpenses(year:number)
  {
    const ExpenseList = this.expenseService.getExpenses().filter(expense=>{
      return expense.time.getFullYear()==year;
    })

    let monthlyExpensesResult:number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
    ExpenseList.forEach(expense=>
    {
      monthlyExpensesResult[expense.time.getMonth()]+=expense.amount*expense.pricePerUnit;
    })
    console.log(monthlyExpensesResult)
    return monthlyExpensesResult;
    
  }



}
