import { FrontUserInfoMasterInsertEntity } from "../../../internaldata/frontuserinfomaster/entity/FrontUserInfoMasterInsertEntity";
import { FrontUserInfoMasterJsonModelType } from "../../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterJsonModelType";
import { FRONT_USER_INFO_MASTER_FILE_PATH } from "../../../internaldata/frontuserinfomaster/repository/concrete/FrontUserInfoMasterRepositoryJson";
import { JsonFileData } from "../../../util/service/JsonFileData";
import { JsonWebTokenUserInfoSelectEntity } from "../../entity/JsonWebTokenUserInfoSelectEntity";
import { JsonWebTokenUserInfoRepositoryInterface } from "../interface/JsonWebTokenUserInfoRepositoryInterface";



/**
 * json形式の永続ロジック用クラス
 */
export class JsonWebTokenUserInfoRepositoryJson implements JsonWebTokenUserInfoRepositoryInterface {

    private _frontUserInfoMasterJsonList: ReadonlyArray<FrontUserInfoMasterJsonModelType>;

    constructor() {

        // ユーザーマスタファイルからデータを取得
        const jsonUserInfoMasterList: FrontUserInfoMasterJsonModelType[] = JsonFileData.getFileObj(FRONT_USER_INFO_MASTER_FILE_PATH);

        this._frontUserInfoMasterJsonList = jsonUserInfoMasterList;
    }


    /**
     * ユーザー取得
     * @returns 
     */
    public select(JsonWebTokenUserInfoSelectEntity: JsonWebTokenUserInfoSelectEntity):
        ReadonlyArray<FrontUserInfoMasterJsonModelType> {

        const selectedFrontUserInfoMasterJsonList = this._frontUserInfoMasterJsonList.filter((e: FrontUserInfoMasterJsonModelType) => {
            return e.userId === JsonWebTokenUserInfoSelectEntity.frontUserId &&
                e.password === JsonWebTokenUserInfoSelectEntity.frontUserPassword;
        });

        return selectedFrontUserInfoMasterJsonList;
    }

}