import { z } from "zod";

// 本棚登録時のリクエストのバリデーションチェック用
export const CreateBookShelfRequestModelSchema = z.object({
    bookId: z.string().min(1, "bookIdは必須です。"),
});