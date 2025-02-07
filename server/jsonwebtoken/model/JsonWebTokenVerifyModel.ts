import ENV from '../../env.json';
import { FrontUserIdModel } from '../../internaldata/frontuserinfomaster/properties/FrontUserIdModel';
import { FrontUserPasswordModel } from '../../internaldata/frontuserinfomaster/properties/FrontUserPasswordModel';


export class JsonWebTokenVerifyModel {

    private readonly jwt = require("jsonwebtoken");
    // ユーザーID
    private readonly _frontUserIdModel: FrontUserIdModel;
    // パスワード
    private readonly _frontUserPasswordModel: FrontUserPasswordModel;


    constructor(token: string) {

        if (!token) {
            throw Error(`トークンが存在しません。`);
        }

        const jwtSecretKey = ENV.JSON_WEB_TOKEN_KEY;

        if (!jwtSecretKey) {
            throw Error(`設定ファイルにjwtの秘密鍵が設定されていません。`);
        }

        try {

            const decoded = this.jwt.verify(token, jwtSecretKey);

            if (!decoded) {
                throw Error(`認証情報の取得に失敗しました。`);
            }

            const id: string = decoded.ID;
            const verifyArray: string[] = id.split(',');

            if (!verifyArray || verifyArray.length !== 2) {
                throw Error(`認証情報が不正です。`);
            }

            this._frontUserIdModel = FrontUserIdModel.reConstruct(verifyArray[0]);
            this._frontUserPasswordModel = new FrontUserPasswordModel(verifyArray[1]);
        } catch (err) {
            throw Error(`jwt認証エラーが発生しました。ERROR:${err}`);
        }

    }


    get frontUserIdModel() {
        return this._frontUserIdModel;
    }

    get frontUserPasswordModel() {
        return this._frontUserPasswordModel;
    }

}