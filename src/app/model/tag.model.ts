export class Tag
{
    public ID:number;
    public name:string;
    public description:string;
    public dateCreated:Date;
    public bgColor:string;
    public txtColor:string;

    constructor(ID:number, name:string, description:string, bgColor:string, txtColor:string, time:Date =new Date() )
    {
        this.ID = ID;
        this.name= name;
        this.description = description;
        this.dateCreated= time;
        this.bgColor = bgColor;
        this.txtColor = txtColor;
    }

}