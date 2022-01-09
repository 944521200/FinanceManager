import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MaterialModule } from '../material/material.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

@NgModule({
    declarations: [SettingsComponent],
    imports: [CommonModule, SettingsRoutingModule, MaterialModule],
    providers: [DatePipe, { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
    exports: [SettingsComponent],
})
export class SettingsModule {}
