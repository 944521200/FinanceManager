import { Pipe, PipeTransform } from '@angular/core';
import { Expense } from '../model/expense.model';
import { Tag } from '../model/tag.model';

@Pipe({
    name: 'filterExpenses',
})
export class FilterExpensesPipe implements PipeTransform {
    transform(
        value: Expense[] | null,
        nameFilter: string,
        descFilter: string,
        amountFilter: string,
        priceFilter: string,
        dateSinceFilter?: Date,
        dateUntilFilter?: Date,
        filterTags?: Tag[],
        onlyShowUntagged?: boolean,
        hideUntagged?: boolean,
    ): Expense[] {
        if (!value) return [];

        let result: Expense[] = value;

        if (nameFilter !== '')
            result = result.filter((item: Expense) => {
                if (item.name.toLowerCase().includes(nameFilter.toLowerCase())) return true;
                else return false;
            });

        if (descFilter !== '')
            result = result.filter((item: Expense) => {
                if (item.description.toLowerCase().includes(descFilter.toLowerCase())) return true;
                else return false;
            });

        if (amountFilter != null)
            result = result.filter((item: Expense) => {
                if ((item.amount + '').includes(('' + amountFilter).toLowerCase())) return true;
                else return false;
            });

        if (priceFilter != null)
            result = result.filter((item: Expense) => {
                if ((item.pricePerUnit + '').includes(('' + priceFilter).toLowerCase())) return true;
                else return false;
            });

        if (dateSinceFilter) {
            const dateSince = new Date(dateSinceFilter);
            result = result.filter((item: Expense) => {
                if (item.time.valueOf() >= dateSince.valueOf()) return true;
                else return false;
            });
        }

        if (dateUntilFilter) {
            const dateUntil = new Date(dateUntilFilter);
            result = result.filter((item: Expense) => {
                if (item.time.valueOf() <= dateUntil.valueOf()) return true;
                else return false;
            });
        }
        if (onlyShowUntagged ?? false) {
            result = result.filter((item: Expense) => {
                return item.tags.length === 0;
            });
        } else if (filterTags && filterTags.length !== 0) {
            const filterTagsIDs = filterTags.map((tag) => tag.ID);
            result = result.filter((item: Expense) => {
                return (
                    item.tags.every((tag) => filterTagsIDs.includes(tag.ID)) &&
                    (!(hideUntagged ?? false) || item.tags.length !== 0)
                );
            });
        }

        return result;
    }
}
