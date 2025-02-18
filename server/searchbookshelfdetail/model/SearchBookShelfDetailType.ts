// 本棚情報取得結果
export type SearchBookShelfDetailType = {
    readonly userId: string,
    readonly bookId: string,
    readonly title: string,
    readonly readStatus: string,
    readonly thumbnail: string,
    readonly smallThumbnail: string,
}