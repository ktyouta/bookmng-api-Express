// 書籍情報の型
export type BookInfoListModelType = {
    readonly bookId: string,
    readonly title: string,
    readonly publishedDate: string,
    readonly description: string,
    readonly authors: string[],
}