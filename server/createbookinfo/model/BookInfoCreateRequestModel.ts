import { AuthorIdModel } from "../../internaldata/authorsinfomaster/model/AuthorIdMode";
import { DescriptionModel } from "../../internaldata/bookinfomaster/model/DescriptionModel";
import { PublishedDateModel } from "../../internaldata/bookinfomaster/model/PublishedDateModel";
import { TitleModel } from "../../internaldata/bookinfomaster/model/TitleModel";
import { ArrayUtil } from "../../util/service/ArrayUtil";
import { BookInfoCreateRequestType } from "./BookInfoCreateRequestType";

export class BookInfoCreateRequestModel {

    private _titleModel: TitleModel;
    private _authorIdListModel: AuthorIdModel[];
    private _descriptionModel: DescriptionModel;
    private _publishedDateModel: PublishedDateModel;


    constructor(bookInfoCreateBody: BookInfoCreateRequestType) {

        this._titleModel = new TitleModel(bookInfoCreateBody.title);

        const authorIdModelList: AuthorIdModel[] = bookInfoCreateBody.authorIdList.map((e: string) => {
            return AuthorIdModel.reConstruct(e);
        });

        this._authorIdListModel = authorIdModelList;
        this._descriptionModel = new DescriptionModel(bookInfoCreateBody.description);
        this._publishedDateModel = new PublishedDateModel(bookInfoCreateBody.publishedDate);
    }


    public get titleModel() {
        return this._titleModel;
    }

    public get authorIdListModel() {
        return this._authorIdListModel;
    }

    public get descriptionModel() {
        return this._descriptionModel;
    }

    public get publishedDateModel() {
        return this._publishedDateModel;
    }


    /**
     * 著者IDリストの同一チェック
     * @param AuthorIdModel 
     * @returns 
     */
    public checkAuthorIdListDuplicate(AuthorIdModel: AuthorIdModel[]) {

        const _authorIdModelList: AuthorIdModel[] = this._authorIdListModel;
        const _authorIdList: string[] = _authorIdModelList.map((e: AuthorIdModel) => {
            return e.authorId;
        });

        return ArrayUtil.checkArrayEqual(_authorIdList, AuthorIdModel.map((e) => {
            return e.authorId;
        }));
    }
}