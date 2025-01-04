// 書籍情報登録時のリクエストの型
export type BookInfoCreateRequestType = {
    title: string,
    authorIdList: string[],
    description: string,
    publishedDate: string,
}