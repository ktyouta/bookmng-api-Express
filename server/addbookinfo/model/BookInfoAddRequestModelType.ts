// 書籍情報登録情報の型
export type BookInfoAddRequestModelType = {
    bookId: string,
    title: string,
    authorId: string,
    authros: string[],
    description: string,
    publishedDate: string,
}