import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ExpenseComponent } from './expense/expense.component';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './expenses.component';
import { SearchExpensesComponent } from './search-expenses/search-expenses.component';

@NgModule({
    declarations: [ExpensesComponent, ExpenseComponent, AddExpenseComponent, SearchExpensesComponent],
    imports: [CommonModule, ExpensesRoutingModule, FormsModule, ReactiveFormsModule, MaterialModule],
    providers: [DatePipe],
    exports: [ExpensesComponent],
})
export class ExpensesModule {}
