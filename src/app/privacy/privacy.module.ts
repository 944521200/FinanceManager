import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrivacyPageComponent } from './privacy-page/privacy-page.component';
import { PrivacyRoutingModule } from './privacy-routing.module';

@NgModule({
    declarations: [PrivacyPageComponent],
    imports: [CommonModule, PrivacyRoutingModule],
    exports: [PrivacyPageComponent],
})
export class PrivacyModule {}
