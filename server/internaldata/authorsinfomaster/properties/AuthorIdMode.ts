import { JsonFileData } from "../../../util/service/JsonFileData";
import { AUTHROS_MASTER_FILE_PATH } from "../repository/concrete/AuthorsInfoMasterRepositoryJson";
import { AuthorsMasterJsonType } from "../model/AuthorsMasterJsonType";


// 著者IDの接頭辞
const PRE_AUTHOR_ID = `authorId-`;

export class AuthorIdModel {

    private readonly _authorId: string;


    private constructor(authorId: string) {

        if (!authorId) {
            throw Error(`著者IDが空です。`);
        }

        // 著者IDのバリデーションチェック
        if (!AuthorIdModel.validate(authorId)) {
            throw Error(`著者IDのフォーマットが不正です。authorId:${authorId}`);
        }

        this._authorId = authorId;
    }


    public static createNewAuthorId() {

        // 著者ID採番用に著者情報マスタからデータを取得する
        const authorsMasterList: AuthorsMasterJsonType[] = JsonFileData.getFileObj(AUTHROS_MASTER_FILE_PATH);

        if (!authorsMasterList) {
            throw Error("著者IDの採番に必要な著者情報マスタが取得できませんでした。");
        }

        // 著者IDを採番する
        const latestAuthorId = this.create(authorsMasterList);

        if (!latestAuthorId) {
            throw Error("著者IDの採番に失敗しました。");
        }

        return new AuthorIdModel(latestAuthorId);
    }


    /**
     * authorIdをセット
     * @param bookId 
     * @returns 
     */
    public static reConstruct(authorId: string) {

        return new AuthorIdModel(authorId);
    }


    /**
     * 著者IDを取得する
     * @returns 
     */
    public get authorId() {
        return this._authorId;
    }


    /**
     * 著者IDを採番する
     */
    private static create(authorsMasterList: AuthorsMasterJsonType[]): string {

        //IDが最大のNOを取得
        let maxNo = authorsMasterList.reduce<number>((prev: number, current: AuthorsMasterJsonType) => {

            let currentNm = parseInt(current.authorId.replace(`${PRE_AUTHOR_ID}`, ""));
            return Math.max(prev, currentNm);
        }, 0);

        return `${PRE_AUTHOR_ID}${maxNo + 1}`;
    }


    /**
     * 著者IDのバリデーションチェック
     * @param authorId 
     * @returns 
     */
    private static validate(authorId: string) {

        return authorId.includes(PRE_AUTHOR_ID);
    }


    /**
     * 著者IDの同一チェック
     * @param userNameModel 
     * @returns 
     */
    public checkAuthorIdDuplicate(authorIdModel: AuthorIdModel) {

        return this._authorId === authorIdModel.authorId;
    }

}