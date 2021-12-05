import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: 'expenses', loadChildren: () => import('./expenses/expenses.module').then((m) => m.ExpensesModule) },
    { path: 'tags', loadChildren: () => import('./tags/tags.module').then((m) => m.TagsModule) },
    { path: 'graphs', loadChildren: () => import('./graphs/graphs.module').then((m) => m.GraphsModule) },
    { path: 'reports', loadChildren: () => import('./reports/reports.module').then((m) => m.ReportsModule) },
    { path: '', component: HomeComponent },
    { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules,
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
