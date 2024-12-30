// 成功時のレスポンス
export type ResponseSuccessType<T> = {
    status: number,
    message: string
    data: T
}