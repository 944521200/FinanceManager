import { EventEmitter, Injectable } from '@angular/core';
import { Tag } from '../model/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private tags:Tag[] = [];
  private IDCount:number=0;

  private LocalStorageID:string = "Tags";
  private localStorage:Storage= window.localStorage;

  constructor() 
  {

    const tagsSTR = this.localStorage.getItem(this.LocalStorageID);
    if(tagsSTR!=null)
    {
      console.log("Database tags found")
      this.tags = JSON.parse(tagsSTR)
      this.tags.forEach((item:Tag)=>
      {
        if(item.ID>this.IDCount)this.IDCount=item.ID;
      })
      this.IDCount++;
    }
    else
    {
      console.log("database not found")
    }

    this.tagsChanged.subscribe((tags)=>
    {
      this.localStorage.setItem(this.LocalStorageID,JSON.stringify(tags));
    });
  }

  
  public tagsChanged:EventEmitter<Tag[]> =  new EventEmitter<Tag[]>();


  getTag()
  {
    return this.tags.slice();
  }
  addTag( name:string, description:string)
  {
    const tag:Tag =  new Tag(this.IDCount++,name,description);
    this.tags.push(tag);
    this.tagsChanged.emit(this.tags);
  }

  removeTag(ID:number)
  {
    this.tags = this.tags.filter(function(item:Tag, idx) {
      return item.ID!=ID;
    });
    this.tagsChanged.emit(this.tags);
  }




}
