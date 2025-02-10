export class ThoughtsModel {

    private readonly _thoughts: string;

    constructor(thoughts: string) {

        this._thoughts = thoughts;
    }


    get thoughts() {
        return this._thoughts
    }

}