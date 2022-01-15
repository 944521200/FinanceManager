import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { AddTagComponent } from './add-tag/add-tag.component';
import { SearchTagsComponent } from './search-tags/search-tags.component';
import { TagComponent } from './tag/tag.component';
import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags.component';

@NgModule({
    declarations: [AddTagComponent, TagComponent, TagsComponent, SearchTagsComponent],
    imports: [CommonModule, TagsRoutingModule, FormsModule, ReactiveFormsModule, MaterialModule],
    exports: [TagsComponent],
})
export class TagsModule {}
