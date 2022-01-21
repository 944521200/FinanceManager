import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'expenses', loadChildren: () => import('./expenses/expenses.module').then((m) => m.ExpensesModule) },
    { path: 'tags', loadChildren: () => import('./tags/tags.module').then((m) => m.TagsModule) },
    { path: 'graphs', loadChildren: () => import('./graphs/graphs.module').then((m) => m.GraphsModule) },
    // { path: 'tables', loadChildren: () => import('./reports/reports.module').then((m) => m.ReportsModule) },
    { path: 'settings', loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule) },
    { path: '', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule) },
    { path: 'privacy', loadChildren: () => import('./privacy/privacy.module').then((m) => m.PrivacyModule) },
    { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
