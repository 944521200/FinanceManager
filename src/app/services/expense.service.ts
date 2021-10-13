import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Expense } from '../model/expense.model';
import { Tag } from '../model/tag.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService implements OnDestroy  {

  private expenses:Expense[] = [];
  private IDCount:number=0;
  private LocalStorageID:string = "Expenses";
  private localStorage:Storage= window.localStorage;

  private subscription!: Subscription;

  constructor() 
  {
    const expensesSTR = this.localStorage.getItem(this.LocalStorageID);
    if(expensesSTR!=null)
    {
      console.log("Database found")
      this.expenses = JSON.parse(expensesSTR)
      this.expenses.forEach((item:Expense)=>
      {
        if(item.ID>this.IDCount)this.IDCount=item.ID;
      })
      this.IDCount++;
    }
    else
    {
      console.log("database not found")
    }

    this.subscription = this.expensesChanged.subscribe((expenses)=>
    {
      this.localStorage.setItem(this.LocalStorageID,JSON.stringify(expenses));
    });

  }


  public expensesChanged:Subject<Expense[]> =  new Subject<Expense[]>();

  getExpenses()
  {
    return this.expenses.slice();
  }
  addExpense( name:string, description:string, amount:number, pricePerUnit:number,  tags:Tag[],time:Date =new Date())
  {
    const expense:Expense =  new Expense(this.IDCount++,name,description,amount,pricePerUnit,tags,time);
    this.expenses.push(expense);
    this.expensesChanged.next(this.expenses);
  }

  removeExpense(ID:number)
  {
    this.expenses = this.expenses.filter(function(item:Expense, idx) {
      return item.ID!=ID;
    });
    this.expensesChanged.next(this.expenses);
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

}
