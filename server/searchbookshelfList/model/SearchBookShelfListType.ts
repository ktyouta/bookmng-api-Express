// jsonファイルの本棚情報
export type SearchBookShelfListType = {
    readonly userId: string,
    readonly bookId: string,
    readonly title: string,
    readonly authors: string[],
}