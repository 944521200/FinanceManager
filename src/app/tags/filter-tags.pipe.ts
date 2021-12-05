import { Pipe, PipeTransform } from '@angular/core';
import { Tag } from '../model/tag.model';

@Pipe({
    name: 'filterTags',
})
export class FilterTagsPipe implements PipeTransform {
    transform(value: Tag[] | null, nameFilter: string, descFilter: string): Tag[] {
        if (!value) return [];

        let result: Tag[] = value;

        if (nameFilter != '') {
            result = result.filter((item: Tag) => {
                if (item.name.toLowerCase().includes(nameFilter.toLowerCase())) return true;
                else return false;
            });
        }

        if (descFilter != '') {
            result = result.filter((item: Tag) => {
                if (item.description.toLowerCase().includes(descFilter.toLowerCase())) return true;
                else return false;
            });
        }

        return result;
    }
}
