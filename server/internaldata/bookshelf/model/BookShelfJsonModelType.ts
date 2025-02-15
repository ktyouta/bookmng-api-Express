// jsonファイルの本棚情報
export type BookShelfJsonModelType = {
    readonly userId: string,
    readonly bookId: string,
    thoughts: string,
    readStatus: string,
    readonly createDate: string,
    readonly updateDate: string,
    readonly deleteFlg: string,
}