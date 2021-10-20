import { Component, Input, OnInit } from '@angular/core';
import { Tag } from 'src/app/model/tag.model';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  constructor(private tagService:TagService) { }

  @Input("inputTag")
  tag!:Tag;

  ngOnInit(): void {
  }

  deleteTag(){
    this.tagService.removeTag(this.tag.ID)

  }

}
