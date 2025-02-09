import { FRONT_USER_INFO_MASTER_FILE, FRONT_USER_LOGIN_MASTER_FILE, MASTER_FILE_PATH } from "../../../../util/const/FileInfoConst";
import { JsonFileData } from "../../../../util/service/JsonFileData";
import { CreateDateModel } from "../../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../../common/model/UpdateDateModel";
import { FrontUserLoginMasterInsertEntity } from "../../entity/FrontUserLoginMasterInsertEntity";
import { FrontUserLoginMasterUpdateEntity } from "../../entity/FrontUserLoginMasterUpdateEntity";
import { FrontUserLoginMasterJsonModelType } from "../../model/FrontUserLoginMasterJsonModelType";
import { FrontUserLoginMasterRepositoryInterface } from "../interface/FrontUserLoginMasterRepositoryInterface";


// ユーザーログインマスタファイルパス
export const FRONT_USER_LOGIN_MASTER_FILE_PATH = `${MASTER_FILE_PATH}${FRONT_USER_LOGIN_MASTER_FILE}`;


/**
 * json形式の永続ロジック用クラス
 */
export class FrontUserLoginMasterRepositoryJson implements FrontUserLoginMasterRepositoryInterface {

    private _frontUserInfoMasterJsonList: ReadonlyArray<FrontUserLoginMasterJsonModelType>;

    constructor() {

        // ユーザーログインマスタファイルからデータを取得
        const jsonUserInfoMasterList: FrontUserLoginMasterJsonModelType[] = JsonFileData.getFileObj(FRONT_USER_LOGIN_MASTER_FILE_PATH);

        this._frontUserInfoMasterJsonList = jsonUserInfoMasterList;
    }


    /**
     * ユーザー追加
     * @param frontUserInfoMasterModel 
     * @returns 
     */
    public insert(frontUserLoginMasterInsertEntity: FrontUserLoginMasterInsertEntity) {

        // IDの重複チェック
        const duplicateUser = this._frontUserInfoMasterJsonList.find((e: FrontUserLoginMasterJsonModelType) => {
            return e.userId === frontUserLoginMasterInsertEntity.frontUserId;
        });

        if (duplicateUser) {
            throw Error(`ユーザーログイン情報が重複してるため登録できません。`);
        }

        // jsonに変換する
        const frontUserInfoJsonList = this.parseInsertToJson(frontUserLoginMasterInsertEntity);

        // ユーザーを追加する
        this._frontUserInfoMasterJsonList = [...this._frontUserInfoMasterJsonList, frontUserInfoJsonList];
    }


    /**
     * ユーザー更新
     */
    public update(frontUserLoginMasterUpdateEntity: FrontUserLoginMasterUpdateEntity) {

        // ユーザーの存在チェック
        const updateUser = this._frontUserInfoMasterJsonList.find((e: FrontUserLoginMasterJsonModelType) => {
            return e.userId === frontUserLoginMasterUpdateEntity.frontUserId;
        });

        if (!updateUser) {
            throw Error(`更新対象のユーザーログイン情報が存在しません。`);
        }
    }


    /**
     * ユーザーマスタファイルにデータを書き込む
     */
    public commit() {

        try {
            JsonFileData.overWrite(FRONT_USER_LOGIN_MASTER_FILE_PATH, this._frontUserInfoMasterJsonList);
        } catch (err) {
            throw Error(`フロントユーザーログインマスタファイルのデータ書き込み処理中にエラーが発生しました。ERROR:${err}`);
        }
    }


    /**
     * json形式に変換する
     * @param userInfoMaster 
     * @returns 
     */
    private parseInsertToJson(frontUserLoginMasterInsertEntity: FrontUserLoginMasterInsertEntity): FrontUserLoginMasterJsonModelType {

        // jsonファイル登録用の型に変換する
        const jsonUserInfoMaster: FrontUserLoginMasterJsonModelType = {
            userId: frontUserLoginMasterInsertEntity.frontUserId,
            password: frontUserLoginMasterInsertEntity.frontUserPassword,
            createDate: frontUserLoginMasterInsertEntity.createDate,
            updateDate: frontUserLoginMasterInsertEntity.updateDate,
            deleteFlg: frontUserLoginMasterInsertEntity.deleteFlg,
        };

        return jsonUserInfoMaster;
    }
}