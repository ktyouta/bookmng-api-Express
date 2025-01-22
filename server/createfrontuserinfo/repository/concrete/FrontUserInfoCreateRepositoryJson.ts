import { FrontUserInfoMasterInsertEntity } from "../../../internaldata/frontuserinfomaster/entity/FrontUserInfoMasterInsertEntity";
import { FrontUserInfoMasterJsonModelType } from "../../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterJsonModelType";
import { FRONT_USER_INFO_MASTER_FILE_PATH, FrontUserInfoMasterListModel } from "../../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterListModel";
import { JsonFileData } from "../../../util/service/JsonFileData";
import { FrontUserInfoCreateSelectEntity } from "../../entity/FrontUserInfoCreateSelectEntity";
import { FrontUserInfoCreateRepositoryInterface } from "../interface/FrontUserInfoCreateRepositoryInterface";



/**
 * json形式の永続ロジック用クラス
 */
export class FrontUserInfoCreateRepositoryJson implements FrontUserInfoCreateRepositoryInterface {

    private _frontUserInfoMasterJsonList: ReadonlyArray<FrontUserInfoMasterJsonModelType>;

    constructor() {

        // ユーザーマスタからデータを取得する
        const frontUserInfoMasterListModel = new FrontUserInfoMasterListModel();

        const frontUserInfoMasterJsonList: ReadonlyArray<FrontUserInfoMasterJsonModelType> =
            frontUserInfoMasterListModel.latestUserInfoMasterJsonList;

        this._frontUserInfoMasterJsonList = frontUserInfoMasterJsonList;
    }


    /**
     * ユーザー取得
     * @returns 
     */
    public select(frontUserInfoCreateSelectEntity: FrontUserInfoCreateSelectEntity): ReadonlyArray<FrontUserInfoMasterJsonModelType> {

        // FrontUserInfoCreateSelectEntityでselectする
        const selectedFrontUserInfoMasterJsonList = this._frontUserInfoMasterJsonList.filter((e: FrontUserInfoMasterJsonModelType) => {
            return e.userName === frontUserInfoCreateSelectEntity.frontUserName;
        });

        return selectedFrontUserInfoMasterJsonList;
    }

}