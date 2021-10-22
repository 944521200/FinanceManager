import { Pipe, PipeTransform } from '@angular/core';
import { Tag } from '../model/tag.model';

@Pipe({
  name: 'filterTags'
})
export class FilterTagsPipe implements PipeTransform {

  transform(value: Tag[], nameFilter:string, descFilter:string, dateSinceFilter?:Date, dateUntilFilter?:Date):  Tag[] {
    var result:Tag[] = value;

    result = result.filter((item:Tag)=>
    {
      if(!item.name || item.name.toLowerCase().includes(nameFilter.toLowerCase()))return true;
      else return false;
    });

    if(descFilter!="")
    {
      result = result.filter((item:Tag)=>
      {
        if(item.description && item.description.toLowerCase().includes(descFilter.toLowerCase()))return true;
        else return false;
      });
    }

    if(dateSinceFilter)
    result = result.filter((item:Tag)=>
    {
      if(item.dateCreated.valueOf() >=dateSinceFilter.valueOf()) return true;
      else return false;
    });

    if(dateUntilFilter)
    result = result.filter((item:Tag)=>
    {
      if(item.dateCreated.valueOf() <= dateUntilFilter.valueOf()) return true;
      else return false;
    });

    return result;
  
  }

}
