// 書籍情報登録時のリクエストの型
export type BookInfoAddRequestModelType = {
    title: string,
    authros: string[],
    description: string,
    publishedDate: string,
}