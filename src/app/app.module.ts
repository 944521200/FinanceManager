import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { expensesReducer } from './expenses/store/expenses.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ExpensesEffects } from './expenses/store/expenses.effects';
import { tagsReducer } from './tags/store/tags.reducer';
import { TagsEffects } from './tags/store/tags.effects';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
    declarations: [AppComponent, HomeComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        StoreModule.forRoot({ expenses: expensesReducer, tags: tagsReducer }),
        EffectsModule.forRoot([ExpensesEffects, TagsEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: true,
            autoPause: true,
        }),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
