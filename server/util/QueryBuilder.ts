export class QueryBuilder {

    private queryParam: Record<string, string | number> = {};

    /**
     * クエリを追加する
     * @param key 
     * @param value 
     */
    public addQuery(key: string, value: string | number) {

        this.queryParam[key] = value;
    }

    /**
     * クエリパラメータを作成する
     */
    public createQueryStr() {

        return Object.entries(this.queryParam).map(([key, value]) => {
            return {
                key,
                value,
            }
        }).filter((element) => {
            return !!element.value;
        }).join("&");
    }

}