import {  Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Tag } from '../model/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService implements OnDestroy {

  private tags:Tag[] = [];
  private IDCount:number=0;

  private LocalStorageID:string = "Tags";
  private localStorage:Storage= window.localStorage;


  private subscription!: Subscription;

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

    this.subscription = this.tagsChanged.subscribe((tags)=>
    {
      this.localStorage.setItem(this.LocalStorageID,JSON.stringify(tags));
    });
  }

  
  public tagsChanged:Subject<Tag[]> =  new Subject<Tag[]>();
  public editingTag:Subject<number> =  new Subject<number>();


  getTags()
  {
    return this.tags.slice();
  }

  getTag(id:number)
  {
    return this.tags.filter(tag=>{
      if(tag.ID!=id)return false
      else return true;
    })[0]
  }
  
  addTag( name:string, description:string, bgColor:string, txtColor:string)
  {
    const tag:Tag =  new Tag(this.IDCount++,name,description, bgColor, txtColor);
    this.tags.push(tag);
    this.tagsChanged.next([...this.tags]);
  }

  removeTag(ID:number)
  {
    this.tags = this.tags.filter(function(item:Tag, idx) {
      return item.ID!=ID;
    });
    this.tagsChanged.next([...this.tags]);
  }

  udpateTag(
    ID: number,
    name: string,
    description: string,
    bgColor:string,
    txtColor:string,
    time: Date = new Date()
  ) {
    const newTag: Tag = new Tag(
      ID,
      name,
      description,
      bgColor,
      txtColor,
      time
    );

    this.tags = this.tags.map((tag) => {
      if (tag.ID == ID) {
        return newTag;
      } else {
        return tag;
      }
    });
    this.tagsChanged.next([...this.tags]);
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }



}
