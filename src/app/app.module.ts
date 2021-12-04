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
import { FilterExpensesPipe } from './expenses/filter-expenses.pipe';
import { AddTagComponent } from './tags/add-tag/add-tag.component';
import { TagComponent } from './tags/tag/tag.component';
import { TagsComponent } from './tags/tags.component';
import { SearchTagsComponent } from './tags/search-tags/search-tags.component';
import { FilterTagsPipe } from './tags/filter-tags.pipe';
import { GraphComponent } from './graph/graph.component';
import { AgGridModule } from 'ag-grid-angular';
import { StoreModule } from '@ngrx/store';
import { expensesReducer } from './expenses/store/expenses.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ExpensesEffects } from './expenses/store/expenses.effects';
import { tagsReducer } from './tags/store/tags.reducer';
import { TagsEffects } from './tags/store/tags.effects';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DatePipe } from '@angular/common';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ReportComponent,
        ExpensesComponent,
        ExpenseComponent,
        AddExpenseComponent,
        SearchExpensesComponent,
        FilterExpensesPipe,
        AddTagComponent,
        TagComponent,
        TagsComponent,
        SearchTagsComponent,
        FilterTagsPipe,
        GraphComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        StoreModule.forRoot({ expenses: expensesReducer, tags: tagsReducer }),
        StoreDevtoolsModule.instrument({
          maxAge: 25, // Retains last 25 states
          logOnly: true, // Restrict extension to log-only mode
          autoPause: true, // Pauses recording actions and state changes when the extension window is not open
        }),
        EffectsModule.forRoot([ExpensesEffects, TagsEffects]),
    ],
    providers: [DatePipe],
    bootstrap: [AppComponent],
})
export class AppModule {}
