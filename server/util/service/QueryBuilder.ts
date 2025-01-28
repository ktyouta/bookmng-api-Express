export class QueryBuilder {

    private _queryParam: Record<string, string | number>;

    constructor(key: string, value: string) {

        if (!key) {
            throw Error(`クエリパラメータのキーが設定されていません。`);
        }

        if (!value) {
            throw Error(`クエリパラメータの値が設定されていません。`);
        }

        this._queryParam = {
            [key]: value
        }
    }

    /**
     * クエリを追加する
     * @param key 
     * @param value 
     */
    public add(key: string, value: string | number) {

        this._queryParam = {
            ...this._queryParam,
            [key]: value
        }
    }

    /**
     * クエリパラメータを作成する
     */
    public createParam() {

        return Object.entries(this._queryParam).map(([key, value]) => {
            return {
                key,
                value,
            }
        }).filter((element) => {
            return !!element.value;
        }).map((element) => {
            return `${element.key}=${element.value}`
        }).join("&");
    }

}