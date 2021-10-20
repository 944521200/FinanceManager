import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesComponent } from './expenses/expenses.component';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
import { TagsComponent } from './tags/tags.component';

const routes: Routes = [
  { path: 'expenses', component: ExpensesComponent },
  { path: 'report', component: ReportComponent },
  { path: 'tags', component: TagsComponent },
  { path: '', component: HomeComponent },
  { path: '**',   redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
