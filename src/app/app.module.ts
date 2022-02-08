import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
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
        MatIconModule,
        AppRoutingModule,

        // StoreDevtoolsModule.instrument({
        //     maxAge: 25,
        //     logOnly: true,
        //     autoPause: true,
        // }),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
        matIconRegistry.addSvgIcon('FM_Logo', domSanitizer.bypassSecurityTrustResourceUrl('assets/icon.svg'));
    }
}
