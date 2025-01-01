import { GoogleBooksAPIsImageLinksModelType } from "./GoogleBooksAPIsImageLinksModelType";

// 書籍のメイン情報の型
export type GoogleBooksAPIsVolumeInfoModelType = {
    title?: string,
    authors?: string[],
    publishedDate?: string,
    imageLinks?: GoogleBooksAPIsImageLinksModelType,
    description?: string,
}