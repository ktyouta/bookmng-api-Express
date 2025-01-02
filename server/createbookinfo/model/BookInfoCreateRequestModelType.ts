// 書籍情報登録時のリクエストの型
export type BookInfoCreateRequestModelType = {
    title: string,
    authorIdList: string[],
    description: string,
    publishedDate: string,
}