import { GoogleBooksAPIsModelItemsType } from "./GoogleBooksAPIsModelItemsType"

// Google Books APIから取得したデータの型
export type GoogleBooksAPIsModelType = {
    readonly kind: string,
    readonly totalItems: number,
    readonly items: GoogleBooksAPIsModelItemsType[]
}