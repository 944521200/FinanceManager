import { NgModule } from '@angular/core';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    imports: [
        // MatInputModule,
        // MatFormFieldModule,
        // FlexLayoutModule,
        // MatChipsModule,
        // MatIconModule,
        // MatAutocompleteModule,
        // MatSelectModule,
        // MatButtonModule,
        // MatDividerModule,
        // MatCardModule,
        // MatDialogModule,
    ],
    providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
    exports: [
        MatInputModule,
        MatFormFieldModule,
        FlexLayoutModule,
        MatChipsModule,
        MatIconModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatButtonModule,
        MatDividerModule,
        MatCardModule,
        LayoutModule,
        MatListModule,
        MatToolbarModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatDialogModule,
    ],
})
export class MaterialModule {}
