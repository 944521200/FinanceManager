import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

@NgModule({
    declarations: [SettingsComponent],
    imports: [CommonModule, SettingsRoutingModule, MaterialModule],
    providers: [DatePipe],
    exports: [SettingsComponent],
})
export class SettingsModule {}
