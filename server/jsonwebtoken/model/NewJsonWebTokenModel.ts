import ENV from '../../env.json';
import { FrontUserIdModel } from '../../internaldata/frontuserinfomaster/properties/FrontUserIdModel';


export class NewJsonWebTokenModel {

    private readonly jwt = require("jsonwebtoken");
    private readonly token: string;

    constructor(frontUserIdModel: FrontUserIdModel) {

        const jwtSecretKey = ENV.JSON_WEB_TOKEN_KEY;

        if (!jwtSecretKey) {
            throw Error(`設定ファイルにjwtの秘密鍵が設定されていません。`);
        }

        const frontUserId = frontUserIdModel.frontUserId;

        if (!frontUserId) {
            throw Error(`jwtの作成にはユーザーIDが必要です。`);
        }

        const jwtStr = `${frontUserId}`;
        this.token = this.jwt.sign({ ID: jwtStr }, jwtSecretKey);
    }

    get getToken() {
        return this.token;
    }

}