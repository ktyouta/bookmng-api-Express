import ENV from '../../env.json';
import { FrontUserIdModel } from '../../internaldata/frontuserinfomaster/properties/FrontUserIdModel';
import { FRONT_USER_INFO_MASTER_FILE_PATH } from '../../internaldata/frontuserinfomaster/repository/concrete/FrontUserInfoMasterRepositoryJson';
import { FrontUserLoginMasterJsonModelType } from '../../internaldata/frontuserloginmaster/model/FrontUserLoginMasterJsonModelType';
import { FrontUserPasswordModel } from '../../internaldata/frontuserloginmaster/properties/FrontUserPasswordModel';
import { RepositoryType } from '../../util/const/CommonConst';
import { JsonFileData } from '../../util/service/JsonFileData';
import { JsonWebTokenUserInfoSelectEntity } from '../entity/JsonWebTokenUserInfoSelectEntity';
import { JsonWebTokenUserInfoRepositorys } from '../repository/JsonWebTokenUserInfoRepositorys';


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
                throw Error(`jwtから認証情報の取得に失敗しました。`);
            }

            const id: string = decoded.ID;
            const verifyArray: string[] = id.split(',');

            if (!verifyArray || verifyArray.length !== 2) {
                throw Error(`jwtの認証情報が不正です。`);
            }

            const frontUserIdModel: FrontUserIdModel = FrontUserIdModel.reConstruct(verifyArray[0]);
            const frontUserPassword: FrontUserPasswordModel = new FrontUserPasswordModel(verifyArray[1]);

            // ユーザーマスタファイルからデータを取得
            const jsonUserInfoMasterList: ReadonlyArray<FrontUserLoginMasterJsonModelType> =
                this.getFrontUser(frontUserIdModel, frontUserPassword);

            // jwtのユーザー情報がユーザーマスタに存在しない
            if (jsonUserInfoMasterList.length === 0) {
                throw Error(`jwtのユーザー情報がユーザーログインマスタに存在しません。`);
            }

            this._frontUserIdModel = frontUserIdModel;
            this._frontUserPasswordModel = frontUserPassword;
        } catch (err) {
            throw Error(`jwt認証中にエラーが発生しました。ERROR:${err}`);
        }
    }


    get frontUserIdModel() {
        return this._frontUserIdModel;
    }

    get frontUserPasswordModel() {
        return this._frontUserPasswordModel;
    }


    /**
     * jwt認証用のユーザー情報を取得
     * @param frontUserIdModel 
     * @param frontUserPassword 
     * @returns 
     */
    private getFrontUser(frontUserIdModel: FrontUserIdModel,
        frontUserPassword: FrontUserPasswordModel
    ): ReadonlyArray<FrontUserLoginMasterJsonModelType> {

        // 永続ロジック用オブジェクトを取得
        const frontUserInfoCreateRepository = (new JsonWebTokenUserInfoRepositorys()).get(RepositoryType.JSON);

        // ユーザログイン情報取得用Entity
        const frontUserInfoCreateSelectEntity = new JsonWebTokenUserInfoSelectEntity(frontUserIdModel, frontUserPassword);

        // ユーザーログイン情報を取得
        const userInfoMasterList: ReadonlyArray<FrontUserLoginMasterJsonModelType> =
            frontUserInfoCreateRepository.select(frontUserInfoCreateSelectEntity);

        return userInfoMasterList;
    }

}