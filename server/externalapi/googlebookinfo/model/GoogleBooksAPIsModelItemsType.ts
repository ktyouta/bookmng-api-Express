import { GoogleBooksAPIsVolumeInfoModelType } from "./GoogleBooksAPIsVolumeInfoModelType"

// 書籍情報の型
export type GoogleBooksAPIsModelItemsType = {
    readonly id: string,
    readonly volumeInfo: GoogleBooksAPIsVolumeInfoModelType
}