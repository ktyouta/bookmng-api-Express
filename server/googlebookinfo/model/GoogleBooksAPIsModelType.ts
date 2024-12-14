import { GoogleBooksAPIsModelItemsType } from "./GoogleBooksAPIsModelItemsType"

// Google Books APIから取得したデータの型
export type GoogleBooksAPIsModelType = {
    kind: string,
    totalItems: number,
    items: GoogleBooksAPIsModelItemsType[]
}