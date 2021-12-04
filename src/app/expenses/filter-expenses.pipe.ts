import { Pipe, PipeTransform } from '@angular/core';
import { Expense } from '../model/expense.model';

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
    ): Expense[] {
        if (!value) return [];

        var result: Expense[] = value;

        if (nameFilter)
            result = result.filter((item: Expense) => {
                if (item.name!.toLowerCase().includes(nameFilter.toLowerCase())) return true;
                else return false;
            });

        if (descFilter)
            result = result.filter((item: Expense) => {
                if (item.description!.toLowerCase().includes(descFilter.toLowerCase())) return true;
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

        if (dateSinceFilter)
            result = result.filter((item: Expense) => {
                if (item.time!.valueOf() >= dateSinceFilter.valueOf()) return true;
                else return false;
            });

        if (dateUntilFilter)
            result = result.filter((item: Expense) => {
                if (item.time!.valueOf() <= dateUntilFilter.valueOf()) return true;
                else return false;
            });

        return result;
    }
}
