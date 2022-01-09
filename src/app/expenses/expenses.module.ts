import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MaterialModule } from '../material/material.module';
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
    imports: [CommonModule, ExpensesRoutingModule, FormsModule, ReactiveFormsModule, MaterialModule],
    providers: [DatePipe, { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
    exports: [ExpensesComponent],
})
export class ExpensesModule {}
