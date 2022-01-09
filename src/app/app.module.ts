import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { expensesReducer } from './expenses/store/expenses.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ExpensesEffects } from './expenses/store/expenses.effects';
import { tagsReducer } from './tags/store/tags.reducer';
import { TagsEffects } from './tags/store/tags.effects';

// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { analyticsReducer } from './analytics/analytics.reducer';
import { AnalyticsEffects } from './analytics/analytics.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { environment } from 'src/environments/environment';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { settingsReducer } from './settings/store/settings.reducer';
import { SettingsEffects } from './settings/store/settings.effects';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        StoreModule.forRoot({
            expenses: expensesReducer,
            tags: tagsReducer,
            analytics: analyticsReducer,
            settings: settingsReducer,
        }),
        EffectsModule.forRoot([ExpensesEffects, TagsEffects, AnalyticsEffects, SettingsEffects]),
        // !environment.production
        //     ? StoreDevtoolsModule.instrument({
        //           maxAge: 25,
        //           logOnly: true,
        //           autoPause: true,
        //       })
        //     : [],
        BrowserAnimationsModule,
        /** Material imports only used by the app component */
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatSlideToggleModule,
        FlexLayoutModule,
        MatButtonModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
