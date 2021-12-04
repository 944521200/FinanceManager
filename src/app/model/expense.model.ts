import { Tag } from './tag.model';

export class Expense {
    public ID: number;
    public name: string;
    public description: string;
    public amount: number;
    public pricePerUnit: number;
    public time: Date;
    public tags: Tag[];

    constructor(
        ID: number,
        name: string,
        description: string,
        amount: number,
        pricePerUnit: number,
        time: Date,
        tags: Tag[],
    ) {
        this.ID = ID;
        this.name = name;
        this.description = description;
        this.amount = amount;
        this.pricePerUnit = pricePerUnit;
        this.time = time;
        this.tags = tags;
    }

}

export const DEFAULT_EXPENSE: Expense = {
    ID: -1,
    name: '',
    description: '',
    amount: 1,
    pricePerUnit: 0,
    tags: [],
    time: new Date(),
};

export function equalExpense(expenseA: Expense, expenseB: Expense): boolean {
  return expenseA.ID === expenseB.ID;
}
