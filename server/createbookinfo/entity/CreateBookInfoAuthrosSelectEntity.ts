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

    constructor(authorIdModelList: AuthorIdModel[]) {

        this._authorIdModelList = authorIdModelList;
    }

    public get authorIdModelList() {
        return this._authorIdModelList;
    }

}