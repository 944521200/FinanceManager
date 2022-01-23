import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        /** Only necesary for the icon registry */
        HttpClientModule,

        AppRoutingModule,

        // StoreDevtoolsModule.instrument({
        //     maxAge: 25,
        //     logOnly: true,
        //     autoPause: true,
        // }),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
