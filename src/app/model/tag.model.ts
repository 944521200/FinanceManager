export class Tag
{
    public ID:number;
    public name:string;
    public description:string;
    public dateCreated:Date;

    constructor(ID:number, name:string, description:string, time:Date =new Date())
    {
        this.ID = ID;
        this.name= name;
        this.description = description;
        this.dateCreated= time;
    }

}