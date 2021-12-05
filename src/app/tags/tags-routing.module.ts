import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagsComponent } from './tags.component';

const routes: Routes = [
    { path: '', component: TagsComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TagsRoutingModule {}
