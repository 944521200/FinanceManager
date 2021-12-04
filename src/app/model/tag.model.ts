export class Tag {
    public ID: number;
    public name: string;
    public description: string;
    public bgColor: string;
    public txtColor: string;

    constructor(ID: number, name: string, description: string, bgColor: string, txtColor: string) {
        this.ID = ID;
        this.name = name;
        this.description = description;
        this.bgColor = bgColor;
        this.txtColor = txtColor;
    }
}

export const DEFAULT_TAG: Tag = {
    ID: -1,
    name: '',
    description: '',
    bgColor: '#545454',
    txtColor: '#e6e6e6',
};

export function equalTag(tagA: Tag, tagB: Tag): boolean {
    return tagA.ID === tagB.ID;
}

export function tagIncluded(tags: Tag[], tag: Tag): boolean {
    let isIncluded = false;
    tags.forEach((aTag) => {
        if (aTag.ID === tag.ID) {
            isIncluded = true;
        }
    });
    return isIncluded;
}
