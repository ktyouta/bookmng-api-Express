// 本棚更新時のリクエストの型
export type UpdateBookShelfRequestType = {
    readonly bookId: string,
    readonly thoughts: string,
}