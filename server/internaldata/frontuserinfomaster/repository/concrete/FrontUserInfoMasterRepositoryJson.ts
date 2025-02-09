import { FRONT_USER_INFO_MASTER_FILE, MASTER_FILE_PATH } from "../../../../util/const/FileInfoConst";
import { JsonFileData } from "../../../../util/service/JsonFileData";
import { CreateDateModel } from "../../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../../common/model/UpdateDateModel";
import { FrontUserInfoMasterInsertEntity } from "../../entity/FrontUserInfoMasterInsertEntity";
import { FrontUserInfoMasterUpdateEntity } from "../../entity/FrontUserInfoMasterUpdateEntity";
import { FrontUserInfoMasterJsonModelType } from "../../model/FrontUserInfoMasterJsonModelType";
import { FrontUserBirthdayModel } from "../../properties/FrontUserBirthdayModel";
import { FrontUserIdModel } from "../../properties/FrontUserIdModel";
import { FrontUserNameModel } from "../../properties/FrontUserNameModel";
import { FrontUserInfoMasterRepositoryInterface } from "../interface/FrontUserInfoMasterRepositoryInterface";


// ユーザーマスタファイルパス
export const FRONT_USER_INFO_MASTER_FILE_PATH = `${MASTER_FILE_PATH}${FRONT_USER_INFO_MASTER_FILE}`;


/**
 * json形式の永続ロジック用クラス
 */
export class FrontUserInfoMasterRepositoryJson implements FrontUserInfoMasterRepositoryInterface {

    private _frontUserInfoMasterJsonList: ReadonlyArray<FrontUserInfoMasterJsonModelType>;

    constructor() {

        // ユーザーマスタファイルからデータを取得
        const jsonUserInfoMasterList: FrontUserInfoMasterJsonModelType[] = JsonFileData.getFileObj(FRONT_USER_INFO_MASTER_FILE_PATH);

        this._frontUserInfoMasterJsonList = jsonUserInfoMasterList;
    }


    /**
     * ユーザー追加
     * @param frontUserInfoMasterModel 
     * @returns 
     */
    public insert(frontUserInfoMasterInsertEntity: FrontUserInfoMasterInsertEntity) {

        // IDの重複チェック
        const duplicateUser = this._frontUserInfoMasterJsonList.find((e: FrontUserInfoMasterJsonModelType) => {
            return e.userId === frontUserInfoMasterInsertEntity.frontUserId;
        });

        if (duplicateUser) {
            throw Error(`ユーザー情報が重複してるため登録できません。`);
        }

        // jsonに変換する
        const frontUserInfoJsonList = this.parseInsertToJson(frontUserInfoMasterInsertEntity);

        // ユーザーを追加する
        this._frontUserInfoMasterJsonList = [...this._frontUserInfoMasterJsonList, frontUserInfoJsonList];
    }


    /**
     * ユーザー更新
     */
    public update(frontUserInfoMasterUpdateEntity: FrontUserInfoMasterUpdateEntity) {

        // ユーザーの存在チェック
        const updateUser = this._frontUserInfoMasterJsonList.find((e: FrontUserInfoMasterJsonModelType) => {
            return e.userId === frontUserInfoMasterUpdateEntity.frontUserId;
        });

        if (!updateUser) {
            throw Error(`更新対象のユーザーが存在しません。`);
        }
    }


    /**
     * ユーザーマスタファイルにデータを書き込む
     */
    public commit() {

        try {
            JsonFileData.overWrite(FRONT_USER_INFO_MASTER_FILE_PATH, this._frontUserInfoMasterJsonList);
        } catch (err) {
            throw Error(`ユーザーマスタファイルのデータ書き込み処理中にエラーが発生しました。ERROR:${err}`);
        }
    }


    /**
     * json形式に変換する
     * @param userInfoMaster 
     * @returns 
     */
    private parseInsertToJson(frontUserInfoMasterInsertEntity: FrontUserInfoMasterInsertEntity): FrontUserInfoMasterJsonModelType {

        // jsonファイル登録用の型に変換する
        const jsonUserInfoMaster: FrontUserInfoMasterJsonModelType = {
            userId: frontUserInfoMasterInsertEntity.frontUserId,
            userName: frontUserInfoMasterInsertEntity.frontUserName,
            userBirthDay: frontUserInfoMasterInsertEntity.frontUserBirthDay,
            createDate: frontUserInfoMasterInsertEntity.createDate,
            updateDate: frontUserInfoMasterInsertEntity.updateDate,
            deleteFlg: frontUserInfoMasterInsertEntity.deleteFlg,
        };

        return jsonUserInfoMaster;
    }
}