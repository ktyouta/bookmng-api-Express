// 失敗時のレスポンス
export type ErrorResponseSuccessType<T> = {
    status: number,
    message: string
    data: T
}