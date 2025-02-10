// jsonファイルの本棚情報
export type BookShelfJsonModelType = {
    readonly userId: string,
    readonly bookId: string,
    thoughts: string,
    readonly createDate: string,
    readonly updateDate: string,
    readonly deleteFlg: string,
}