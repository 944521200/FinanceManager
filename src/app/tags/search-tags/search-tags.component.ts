import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tag } from 'src/app/model/tag.model';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-search-tags',
  templateUrl: './search-tags.component.html',
  styleUrls: ['./search-tags.component.css']
})
export class SearchTagsComponent implements OnInit, OnDestroy {

  constructor(private tagService:TagService) { }

  nameSearch:string="";
  desSearch:string="";
  dateSinceSearch:Date | undefined;
  dateUntilSearch:Date | undefined;

  tags:Tag[] = []
  tagSubscription!:Subscription;

  ngOnInit(): void {
    this.tags = this.tagService.getTags();
    this.tagSubscription = this.tagService.tagsChanged.subscribe((tags)=>{this.tags = tags})
  }

  clearSearch()
  {
    this.nameSearch="";
    this.desSearch="";
    this.dateSinceSearch=undefined;
    this.dateUntilSearch=undefined;
  }


  ngOnDestroy() {
    this.tagSubscription.unsubscribe();
  }



}
