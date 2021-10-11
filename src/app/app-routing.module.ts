import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManageComponent } from './manage/manage.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path: 'manage', component: ManageComponent },
  { path: 'report', component: ReportComponent },
  { path: '', component: HomeComponent },
  { path: '**',   redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
