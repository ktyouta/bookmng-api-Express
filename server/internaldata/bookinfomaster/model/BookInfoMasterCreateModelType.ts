import { CreateDaateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { PublishedDateModel } from "./PublishedDateModel";
import { TitleModel } from "./TitleModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { DescriptionModel } from "./DescriptionModel";
import { BookIdModel } from "./BookIdModel";


// 書籍マスタ情報作成時の型
export type BookInfoMasterCreateModelType = {
    bookId: BookIdModel,
    title: TitleModel,
    publishedDate: PublishedDateModel,
    description: DescriptionModel,
    createDate: CreateDaateModel,
    updateDate: UpdateDateModel,
    deleteFlg: DeleteFlgModel,
}