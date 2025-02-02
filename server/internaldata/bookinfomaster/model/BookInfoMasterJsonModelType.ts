// jsonファイルの書籍マスタ情報
export type BookInfoJsonModelType = {
    readonly bookId: string,
    readonly title: string,
    readonly publishedDate: string,
    readonly description: string,
    readonly createDate: string,
    readonly updateDate: string,
    readonly deleteFlg: string,
}