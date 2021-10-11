export class Tag
{
    public name:string;
    public description:string;
    public dateCreated:Date;

    constructor(name:string, description:string, time:Date =new Date())
    {
        this.name= name;
        this.description = description;
        this.dateCreated= time;
    }

}