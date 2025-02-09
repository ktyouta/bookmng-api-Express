import { z } from "zod";

// ログイン時のリクエストのバリデーションチェック用
export const FrontUserLoginRequestModelSchema = z.object({
    userId: z.string().min(1, "userIdは必須です。"),
    password: z.string().min(1, "passwordは必須です。"),
});