import { GoogleBooksAPIsImageLinksModelType } from "./GoogleBooksAPIsImageLinksModelType";

// 書籍のメイン情報の型
export type GoogleBooksAPIsVolumeInfoModelType = {
    readonly title?: string,
    readonly authors?: string[],
    readonly publishedDate?: string,
    readonly imageLinks?: GoogleBooksAPIsImageLinksModelType,
    readonly description?: string,
}