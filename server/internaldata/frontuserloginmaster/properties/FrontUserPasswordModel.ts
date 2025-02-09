import { scryptSync, randomBytes, timingSafeEqual } from "crypto";


export class FrontUserPasswordModel {

    private _frontUserPassword: string;
    private static BYTE_SIZE = 16;
    private static ENCODING: BufferEncoding = `hex`;
    private static HASH_LENGTH = 64;

    constructor(userPassword: string) {

        if (!userPassword) {
            throw Error(`ユーザーのパスワードが設定されていません。`);
        }

        // パスワードをハッシュ化
        const salt = randomBytes(FrontUserPasswordModel.BYTE_SIZE).toString(FrontUserPasswordModel.ENCODING);
        const hashedPassword =
            scryptSync(userPassword, salt, FrontUserPasswordModel.HASH_LENGTH).toString(FrontUserPasswordModel.ENCODING);

        this._frontUserPassword = hashedPassword;
    }

    public get frontUserPassword() {
        return this._frontUserPassword;
    }

}