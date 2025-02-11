import { z } from "zod";

// 書籍情報検索時のクエリパラメータのバリデーションチェック用
export const SearchBookInfoQueryParameterSchema = z.object({
    q: z.string().min(1, "qは必須です。")
}).strict();