import { GoogleBooksAPIsModelItemsType } from "../../externalapi/googlebookinfo/model/GoogleBooksAPIsModelItemsType";

export class BookSearchResponseModel {

    private readonly kind: string = `books#volumes`;
    private readonly totalItems: number;
    private readonly items: GoogleBooksAPIsModelItemsType[];

    constructor(items: GoogleBooksAPIsModelItemsType[]) {

        this.totalItems = items.length;
        this.items = items;
    }

}