import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, HomeRoutingModule, MaterialModule],
    providers: [DatePipe],
    exports: [HomeComponent],
})
export class HomeModule {}
