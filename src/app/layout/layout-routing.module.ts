import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'expenses',
                loadChildren: () => import('../expenses/expenses.module').then((m) => m.ExpensesModule),
            },
            {
                path: 'tags',
                loadChildren: () => import('../tags/tags.module').then((m) => m.TagsModule),
            },
            {
                path: 'graphs',
                loadChildren: () => import('../graphs/graphs.module').then((m) => m.GraphsModule),
            },
            // { path: 'tables', loadChildren: () => import('../reports/reports.module').then((m) => m.ReportsModule) },
            {
                path: 'settings',
                loadChildren: () => import('../settings/settings.module').then((m) => m.SettingsModule),
            },
            {
                path: 'privacy',
                loadChildren: () => import('../privacy/privacy.module').then((m) => m.PrivacyModule),
            },
            {
                path: '',
                pathMatch: 'full',
                loadChildren: () => import('../home/home.module').then((m) => m.HomeModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}
