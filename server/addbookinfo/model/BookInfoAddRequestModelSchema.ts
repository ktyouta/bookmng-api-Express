import { z } from "zod";

// 書籍情報登録時のリクエストのバリデーションチェック用
export const BookInfoAddRequestModelSchema = z.object({
    title: z.string().min(1, "titleは必須です。"),
    authorIdList: z.array(z.string().regex(/^authorId-/, "authorIdはauthorId-で始まる必要があります")),
    description: z.string(),
    publishedDate: z.string().regex(/^[0-9]{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/, "publishedDateは日付形式(yyyyMMdd)である必要があります。"),
});