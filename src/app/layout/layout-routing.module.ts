import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: 'expenses',
        component: LayoutComponent,
        loadChildren: () => import('../expenses/expenses.module').then((m) => m.ExpensesModule),
    },
    {
        path: 'tags',
        component: LayoutComponent,
        loadChildren: () => import('../tags/tags.module').then((m) => m.TagsModule),
    },
    {
        path: 'graphs',
        component: LayoutComponent,
        loadChildren: () => import('../graphs/graphs.module').then((m) => m.GraphsModule),
    },
    // { path: 'tables',component: LayoutComponent, loadChildren: () => import('../reports/reports.module').then((m) => m.ReportsModule) },
    {
        path: 'settings',
        component: LayoutComponent,
        loadChildren: () => import('../settings/settings.module').then((m) => m.SettingsModule),
    },
    {
        path: 'privacy',
        component: LayoutComponent,
        loadChildren: () => import('../privacy/privacy.module').then((m) => m.PrivacyModule),
    },
    {
        path: '',
        pathMatch: 'full',
        component: LayoutComponent,
        loadChildren: () => import('../home/home.module').then((m) => m.HomeModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}
