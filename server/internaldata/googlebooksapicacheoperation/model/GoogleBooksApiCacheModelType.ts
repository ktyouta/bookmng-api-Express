// 書籍、著者、サムネイル(小)、サムネイルのキャッシュ情報をマージした型
export type GoogleBooksApiCacheModelType = {
    bookId: string,
    title?: string,
    authors?: string[],
    publishedDate?: string,
    imageLinks?: {
        smallThumbnail?: string,
        thumbnail?: string,
    },
    description?: string,
}