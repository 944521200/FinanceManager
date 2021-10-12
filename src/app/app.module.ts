import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpenseComponent } from './expenses/expense/expense.component';
import { AddExpenseComponent } from './expenses/add-expense/add-expense.component';
import { SearchExpensesComponent } from './expenses/search-expenses/search-expenses.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReportComponent,
    ExpensesComponent,
    ExpenseComponent,
    AddExpenseComponent,
    SearchExpensesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
