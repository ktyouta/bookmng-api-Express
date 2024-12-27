export class DescriptionModel {

    private description: string;


    constructor(description: string) {

        this.description = description;
    }


    /**
     * 書籍説明を取得する
     * @returns 
     */
    public getDescription() {

        return this.description;
    }
}