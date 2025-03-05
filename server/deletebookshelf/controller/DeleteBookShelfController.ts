import { Router, Request, Response } from 'express';
import ENV from '../../env.json';
import { RouteController } from '../../router/controller/RouteController';
import { AsyncErrorHandler } from '../../router/service/AsyncErrorHandler';
import { HTTP_STATUS_CREATED, HTTP_STATUS_METHOD_NOT_ALLOWED, HTTP_STATUS_OK, HTTP_STATUS_UNPROCESSABLE_ENTITY } from '../../util/const/HttpStatusConst';
import { ApiResponse } from '../../util/service/ApiResponse';
import { ZodIssue } from 'zod';
import { JsonWebTokenVerifyModel } from '../../jsonwebtoken/model/JsonWebTokenVerifyModel';
import { FrontUserIdModel } from '../../internaldata/frontuserinfomaster/properties/FrontUserIdModel';
import { BookShelfRepositoryInterface } from '../../internaldata/bookshelf/repository/interface/BookShelfRepositoryInterface';
import { DeleteBookShelfService } from '../service/DeleteBookShelfService';
import { HttpMethodType, RouteSettingModel } from '../../router/model/RouteSettingModel';
import { ApiEndopoint } from '../../router/conf/ApiEndpoint';
import { BookIdModel } from '../../internaldata/bookinfomaster/properties/BookIdModel';
import { BookShelfJsonModelType } from '../../internaldata/bookshelf/model/BookShelfJsonModelType';


export class DeleteBookShelfController extends RouteController {

    private deleteBookShelfService = new DeleteBookShelfService();

    protected getRouteSettingModel(): RouteSettingModel {

        return new RouteSettingModel(
            HttpMethodType.DELETE,
            this.doExecute,
            ApiEndopoint.BOOKSHELF_INFO_ID
        );
    }


    /**
     * 本棚情報を削除する
     * @param req 
     * @param res 
     * @returns 
     */
    public doExecute(req: Request, res: Response) {

        const id = req.params.id;

        if (!id) {
            return ApiResponse.create(res, HTTP_STATUS_METHOD_NOT_ALLOWED, `書籍IDが指定されていません。`);
        }

        const bookIdModel = BookIdModel.reConstruct(id);

        // jwtの認証を実行する
        const jsonWebTokenVerifyModel = this.deleteBookShelfService.checkJwtVerify(req.cookies.jwt);
        const frontUserIdModel: FrontUserIdModel = jsonWebTokenVerifyModel.frontUserIdModel;

        // 本棚情報の存在チェック
        const bookShelfInfoList: ReadonlyArray<BookShelfJsonModelType> =
            this.deleteBookShelfService.getBookShelf(bookIdModel, frontUserIdModel);

        if (bookShelfInfoList.length === 0) {
            return ApiResponse.create(res, HTTP_STATUS_UNPROCESSABLE_ENTITY, `削除対象の本が存在しません。`);
        }

        const bookShelfInfo: BookShelfJsonModelType = bookShelfInfoList[0];

        // 本棚情報の永続ロジックを取得
        const bookShelfRepository: BookShelfRepositoryInterface = this.deleteBookShelfService.getBookShelfRepository();

        // 本棚の書籍情報を削除
        this.deleteBookShelfService.delete(bookShelfRepository, bookIdModel, frontUserIdModel, bookShelfInfo);

        // コミット
        this.deleteBookShelfService.commit(bookShelfRepository);

        return ApiResponse.create(res, HTTP_STATUS_OK, `本棚の削除が完了しました。`);
    }
}