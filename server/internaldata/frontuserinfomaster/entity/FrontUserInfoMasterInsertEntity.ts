import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { FrontUserInfoMasterModel } from "../model/FrontUserInfoMasterModel";
import { FrontUserBirthdayModel } from "../properties/FrontUserBirthdayModel";
import { FrontUserIdModel } from "../properties/FrontUserIdModel";
import { FrontUserNameModel } from "../properties/FrontUserNameModel";
import { FrontUserInfoMasterRepositoryInterface } from "../repository/interface/FrontUserInfoMasterRepositoryInterface";

export class FrontUserInfoMasterInsertEntity {

    private readonly _frontUserInfoMasterModel: FrontUserInfoMasterModel;

    constructor(userId: FrontUserIdModel,
        userName: FrontUserNameModel,
        userBirthDay: FrontUserBirthdayModel,
        createDate: CreateDateModel,
        updateDate: UpdateDateModel,
        deleteFlg: DeleteFlgModel) {

        this._frontUserInfoMasterModel = new FrontUserInfoMasterModel(
            userId,
            userName,
            userBirthDay,
            createDate,
            updateDate,
            deleteFlg
        );
    }


    /**
     * ユーザー追加
     * @param frontUserInfoMasterRepositoryInterface 
     */
    public insert(frontUserInfoMasterRepositoryInterface: FrontUserInfoMasterRepositoryInterface) {
        frontUserInfoMasterRepositoryInterface.insert(this._frontUserInfoMasterModel);
    }
}