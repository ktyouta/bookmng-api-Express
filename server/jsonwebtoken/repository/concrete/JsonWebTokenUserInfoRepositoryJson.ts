import { FrontUserInfoMasterInsertEntity } from "../../../internaldata/frontuserinfomaster/entity/FrontUserInfoMasterInsertEntity";
import { FRONT_USER_INFO_MASTER_FILE_PATH } from "../../../internaldata/frontuserinfomaster/repository/concrete/FrontUserInfoMasterRepositoryJson";
import { FrontUserLoginMasterJsonModelType } from "../../../internaldata/frontuserloginmaster/model/FrontUserLoginMasterJsonModelType";
import { FRONT_USER_LOGIN_MASTER_FILE_PATH } from "../../../internaldata/frontuserloginmaster/repository/concrete/FrontUserLoginMasterRepositoryJson";
import { JsonFileData } from "../../../util/service/JsonFileData";
import { JsonWebTokenUserInfoSelectEntity } from "../../entity/JsonWebTokenUserInfoSelectEntity";
import { JsonWebTokenUserInfoRepositoryInterface } from "../interface/JsonWebTokenUserInfoRepositoryInterface";



/**
 * json形式の永続ロジック用クラス
 */
export class JsonWebTokenUserInfoRepositoryJson implements JsonWebTokenUserInfoRepositoryInterface {

    private _frontUserInfoMasterJsonList: ReadonlyArray<FrontUserLoginMasterJsonModelType>;

    constructor() {

        // ユーザーマスタファイルからデータを取得
        const jsonUserInfoMasterList: FrontUserLoginMasterJsonModelType[] = JsonFileData.getFileObj(FRONT_USER_LOGIN_MASTER_FILE_PATH);

        this._frontUserInfoMasterJsonList = jsonUserInfoMasterList;
    }


    /**
     * ユーザー取得
     * @returns 
     */
    public select(JsonWebTokenUserInfoSelectEntity: JsonWebTokenUserInfoSelectEntity):
        ReadonlyArray<FrontUserLoginMasterJsonModelType> {

        const selectedFrontUserInfoMasterJsonList = this._frontUserInfoMasterJsonList.filter((e: FrontUserLoginMasterJsonModelType) => {
            return e.userId === JsonWebTokenUserInfoSelectEntity.frontUserId &&
                e.password === JsonWebTokenUserInfoSelectEntity.frontUserPassword;
        });

        return selectedFrontUserInfoMasterJsonList;
    }

}