export class DescriptionModel {

    private readonly _description: string;


    constructor(description: string) {

        this._description = description;
    }


    /**
     * 書籍説明を取得する
     * @returns 
     */
    public get description() {

        return this._description;
    }
}