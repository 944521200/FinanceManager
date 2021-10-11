import { EventEmitter, Injectable } from '@angular/core';
import { Expense } from '../model/expense.model';
import { Tag } from '../model/tag.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private expenses:Expense[] = [];
  private IDCount:number=0;

  constructor() { }

  public expensesChanged:EventEmitter<Expense[]> =  new EventEmitter<Expense[]>();

  getExpenses()
  {
    return this.expenses.slice();
  }
  AddExpense( name:string, description:string, amount:number, pricePerUnit:number,  tags:Tag[],time:Date =new Date())
  {
    const expense:Expense =  new Expense(this.IDCount++,name,description,amount,pricePerUnit,tags,time);
    this.expenses.push(expense);
    this.expensesChanged.emit(this.expenses);
  }

  RemoveExpense(ID:number)
  {
    this.expenses = this.expenses.filter(function(item:Expense, idx) {
      return item.getID()!=ID;
    });
    this.expensesChanged.emit(this.expenses);
  }

}
