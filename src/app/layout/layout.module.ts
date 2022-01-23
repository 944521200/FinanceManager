import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AnalyticsEffects } from '../analytics/analytics.effects';
import { analyticsReducer } from '../analytics/analytics.reducer';
import { ExpensesEffects } from '../expenses/store/expenses.effects';
import { expensesReducer } from '../expenses/store/expenses.reducer';
import { SettingsEffects } from '../settings/store/settings.effects';
import { settingsReducer } from '../settings/store/settings.reducer';
import { TagsEffects } from '../tags/store/tags.effects';
import { tagsReducer } from '../tags/store/tags.reducer';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

@NgModule({
    declarations: [LayoutComponent],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        /** STORE */
        StoreModule.forRoot({
            expenses: expensesReducer,
            tags: tagsReducer,
            analytics: analyticsReducer,
            settings: settingsReducer,
        }),
        EffectsModule.forRoot([ExpensesEffects, TagsEffects, AnalyticsEffects, SettingsEffects]),
        /** Material imports only used by the app component */
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatSlideToggleModule,
        FlexLayoutModule,
        MatButtonModule,
    ],
})
export class LayoutModule {}
