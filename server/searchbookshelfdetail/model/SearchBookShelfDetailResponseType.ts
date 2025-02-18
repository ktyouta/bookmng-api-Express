import { SearchBookShelfDetailThoughtType } from "./SearchBookShelfDetailThoughtType";

// 本棚情報取得結果のレスポンス
export type SearchBookShelfDetailResponseType = {
    readonly userId: string,
    readonly bookId: string,
    readonly title: string,
    readonly readStatus: string,
    readonly authors: string[],
    readonly thoughtList: SearchBookShelfDetailThoughtType[],
}