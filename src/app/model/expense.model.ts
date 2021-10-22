import { Tag } from "./tag.model";

export class Expense
{
    public ID:number;
    public name:string;
    public description:string;
    public amount:number;
    public pricePerUnit:number;
    public time:Date;
    public tags:number[]

    constructor(ID:number, name:string, description:string, amount:number,pricePerUnit:number,  tags:number[],time:Date =new Date())
    {
        this.ID =ID;
        this.name= name;
        this.description = description
        this.amount= amount;
        this.pricePerUnit= pricePerUnit;
        this.time= time;
        this.tags=tags;
    }

}