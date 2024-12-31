// jsonファイルのGoogle Books Api の書籍キャッシュ情報
export type GoogleBooksApiInfoCacheModelType = {
    bookId: string,
    title?: string,
    publishedDate?: string,
    description?: string,
    createDate: string,
    updateDate: string,
}