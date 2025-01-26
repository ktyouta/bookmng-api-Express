import { AuthorIdModel } from "../../internaldata/authorsinfomaster/properties/AuthorIdMode";
import { DeleteFlgModel } from "../../internaldata/common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../internaldata/common/model/UpdateDateModel";
import { FrontUserBirthdayModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserBirthdayModel";
import { FrontUserIdModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserIdModel";
import { FrontUserNameModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserNameModel";
import { FLG } from "../../util/const/CommonConst";



export class CreateBookInfoAuthrosSelectEntity {

    // 著者ID
    private readonly _authorIdModelList: ReadonlyArray<AuthorIdModel>;
    // 削除フラグ
    private readonly _deleteFlgModel: DeleteFlgModel;

    constructor(authorIdModelList: AuthorIdModel[], deleteFlgModel: DeleteFlgModel) {

        this._authorIdModelList = authorIdModelList;
        this._deleteFlgModel = deleteFlgModel;
    }

    public get authorIdModelList() {
        return this._authorIdModelList;
    }

    public get deleteFlg() {
        return this._deleteFlgModel.deleteFlg;
    }
}