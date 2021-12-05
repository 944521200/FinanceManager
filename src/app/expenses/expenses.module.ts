import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ExpenseComponent } from './expense/expense.component';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './expenses.component';
import { FilterExpensesPipe } from './filter-expenses.pipe';
import { SearchExpensesComponent } from './search-expenses/search-expenses.component';

@NgModule({
    declarations: [
        ExpensesComponent,
        ExpenseComponent,
        AddExpenseComponent,
        SearchExpensesComponent,
        FilterExpensesPipe,
    ],
    imports: [CommonModule,ExpensesRoutingModule, FormsModule, ReactiveFormsModule],
    providers: [DatePipe],
    exports: [ExpensesComponent],
})
export class ExpensesModule {}
