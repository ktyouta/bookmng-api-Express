// 本棚情報取得結果のレスポンス
export type SearchBookShelfListRequestType = {
    readonly userId: string,
    readonly bookId: string,
    readonly title: string,
    readonly authors: string[],
    readonly readStatus: string,
}