import { FrontUserLoginMasterJsonModelType } from "../../../internaldata/frontuserloginmaster/model/FrontUserLoginMasterJsonModelType";
import { FRONT_USER_LOGIN_MASTER_FILE_PATH } from "../../../internaldata/frontuserloginmaster/repository/concrete/FrontUserLoginMasterRepositoryJson";
import { JsonFileData } from "../../../util/service/JsonFileData";
import { FrontUserLoginRepositoryInterface } from "../interface/FrontUserLoginRepositoryInterface";
import { FrontUserLoginSelectEntity } from "../../entity/FrontUserLoginSelectEntity";



/**
 * json形式の永続ロジック用クラス
 */
export class FrontUserLoginRepositoryJson implements FrontUserLoginRepositoryInterface {

    private _FrontUserLoginMasterJsonList: ReadonlyArray<FrontUserLoginMasterJsonModelType>;

    constructor() {

        // ユーザーマスタファイルからデータを取得
        const jsonUserInfoMasterList: FrontUserLoginMasterJsonModelType[] = JsonFileData.getFileObj(FRONT_USER_LOGIN_MASTER_FILE_PATH);

        this._FrontUserLoginMasterJsonList = jsonUserInfoMasterList;
    }


    /**
     * ユーザー取得
     * @returns 
     */
    public select(frontUserLoginSelectEntity: FrontUserLoginSelectEntity): ReadonlyArray<FrontUserLoginMasterJsonModelType> {

        // frontUserLoginSelectEntityでselectする
        const selectedFrontUserLoginMasterJsonList = this._FrontUserLoginMasterJsonList.filter((e: FrontUserLoginMasterJsonModelType) => {
            return e.userId === frontUserLoginSelectEntity.frontUserId &&
                e.password === frontUserLoginSelectEntity.frontUserPassword;
        });

        return selectedFrontUserLoginMasterJsonList;
    }

}