// jsonファイルのGoogle Books Api の著者キャッシュ情報
export type GoogleBooksApiAuthorsCacheModelType = {
    bookId: string,
    authorNo: number,
    authorName: string,
    createDate: string,
    updateDate: string,
}