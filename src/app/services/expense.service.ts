import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Expense } from '../model/expense.model';
import { Tag } from '../model/tag.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService implements OnDestroy {
  private expenses: Expense[] = [];
  private IDCount: number = 0;
  private LocalStorageID: string = 'Expenses';
  private localStorage: Storage = window.localStorage;

  private subscription!: Subscription;

  constructor() {
    const expensesSTR = this.localStorage.getItem(this.LocalStorageID);
    if (expensesSTR != null) {
      console.log('Database found');
      this.expenses = JSON.parse(expensesSTR);
      this.expenses.forEach((item: Expense) => {
        if (item.ID > this.IDCount) this.IDCount = item.ID;
        item.time =  new Date(item.time);
      });
      this.IDCount++;
    } else {
      console.log('database not found');
    }

    this.subscription = this.expensesChanged.subscribe((expenses) => {
      this.localStorage.setItem(this.LocalStorageID, JSON.stringify(expenses));
    });
  }

  public expensesChanged: Subject<Expense[]> = new Subject<Expense[]>();
  public editingExpense: Subject<number> = new Subject<number>();

  getExpenses() {
    return this.expenses.slice();
  }

  getExpense(ID: number) {
    return this.expenses.filter((expense) => {
      if (expense.ID == ID) return true;
      else return false;
    })[0];
  }

  addExpense(
    name: string,
    description: string,
    amount: number,
    pricePerUnit: number,
    tags: number[],
    time: Date = new Date()
  ) {
    const expense: Expense = new Expense(
      this.IDCount++,
      name,
      description,
      amount,
      pricePerUnit,
      tags,
      time
    );
    this.expenses.push(expense);
    this.expensesChanged.next([...this.expenses]);
  }

  removeExpense(ID: number) {
    this.expenses = this.expenses.filter(function (item: Expense, idx) {
      return item.ID != ID;
    });
    this.expensesChanged.next([...this.expenses]);
  }

  udpateExpense(
    ID: number,
    name: string,
    description: string,
    amount: number,
    pricePerUnit: number,
    tags: number[],
    time: Date = new Date()
  ) {
    const newExpense: Expense = new Expense(
      ID,
      name,
      description,
      amount,
      pricePerUnit,
      tags,
      time
    );
    this.expenses = this.expenses.map((expense) => {
      if (expense.ID == ID) {
        return newExpense;
      } else {
        return expense;
      }
    });
    this.expensesChanged.next([...this.expenses]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
