import ENV from '../../env.json';
import { KeywordModel } from "../../internaldata/googlebooksapiaccesshistory/properties/KeywordModel";
import { AccessDateModel } from "../../internaldata/googlebooksapiaccesshistory/properties/AccessDateModel";
import { GoogleBooksAPIsModelItemsType } from "../../externalapi/googlebookinfo/model/GoogleBooksAPIsModelItemsType";
import { GoogleBooksApiIdModel } from "../../internaldata/googlebooksapiinfocache/properties/GoogleBooksApiIdModel";
import { GoogleBooksApiTitleModel } from "../../internaldata/googlebooksapiinfocache/properties/GoogleBooksApiTitleModel";
import { GoogleBooksApiPublishedDateModel } from "../../internaldata/googlebooksapiinfocache/properties/GoogleBooksApiPublishedDateModel";
import { GoogleBooksApiDescriptionModel } from "../../internaldata/googlebooksapiinfocache/properties/GoogleBooksApiDescriptionModel";
import { ArrayUtil } from "../../util/service/ArrayUtil";
import { BookSearchRepositorys } from "../repository/BookSearchRepositorys";
import { RepositoryType } from "../../util/const/CommonConst";
import { BookSearchGoogleBooksApiAccessHistorySelectEntity } from "../entity/BookSearchGoogleBooksApiAccessHistorySelectEntity";
import { GoogleBooksApiAccessHistoryRepositorys } from "../../internaldata/googlebooksapiaccesshistory/repository/GoogleBooksApiAccessHistoryRepositorys";
import { GoogleBooksApiAccessHistoryInsertEntity } from "../../internaldata/googlebooksapiaccesshistory/entity/GoogleBooksApiAccessHistoryInsertEntity";
import { GoogleBookInfoApis } from '../../externalapi/googlebookinfo/service/GoogleBookInfoApis';
import { GoogleBookInfoApisKeyword } from '../../externalapi/properties/GoogleBookInfoApisKeyword';
import { BookSearchRepositoryInterface } from '../repository/interface/BookSearchRepositoryInterface';
import { GoogleBooksApiCacheSelectEntity } from '../entity/GoogleBooksApiCacheSelectEntity';
import { GoogleBooksApiSmallThumbnailCacheRepositorys } from '../../internaldata/googlebooksapismallthumbnailcache/repository/GoogleBooksApiSmallThumbnailCacheRepositorys';
import { GoogleBooksApiSmallThumbnailCacheRepositoryInterface } from '../../internaldata/googlebooksapismallthumbnailcache/repository/interface/GoogleBooksApiSmallThumbnailCacheRepositoryInterface';
import { GoogleBooksApiThumbnailCacheRepositoryInterface } from '../../internaldata/googlebooksapithumbnailcache/repository/interface/GoogleBooksApiThumbnailCacheRepositoryInterface';
import { GoogleBooksApiThumbnailCacheRepositorys } from '../../internaldata/googlebooksapithumbnailcache/repository/GoogleBooksApiThumbnailCacheRepositorys';
import { GoogleBooksApiAuthorsCacheRepositorys } from '../../internaldata/googlebooksapiauthorscache/repository/GoogleBooksApiAuthorsCacheRepositorys';
import { GoogleBooksApiAuthorsCacheRepositoryInterface } from '../../internaldata/googlebooksapiauthorscache/repository/interface/GoogleBooksApiAuthorsCacheRepositoryInterface';
import { GoogleBooksApiInfoCacheRepositorys } from '../../internaldata/googlebooksapiinfocache/repository/GoogleBooksApiInfoCacheRepositorys';
import { GoogleBooksApiInfoCacheRepositoryInterface } from '../../internaldata/googlebooksapiinfocache/repository/interface/GoogleBooksApiInfoCacheRepositoryInterface';
import { GoogleBooksApiSmallThumbnailCacheSelectEntity } from '../entity/GoogleBooksApiSmallThumbnailCacheSelectEntity';
import { GoogleBooksApiSmallThumbnailCacheInsertEntity } from '../../internaldata/googlebooksapismallthumbnailcache/entity/GoogleBooksApiSmallThumbnailCacheInsertEntity';
import { SmallThumbnailModel } from '../../internaldata/googlebooksapismallthumbnailcache/properties/SmallThumbnailModel';
import { GoogleBooksApiSmallThumbnailCacheUpdateEntity } from '../../internaldata/googlebooksapismallthumbnailcache/entity/GoogleBooksApiSmallThumbnailCacheUpdateEntity';
import { ThumbnailModel } from '../../internaldata/googlebooksapithumbnailcache/properties/ThumbnailModel';
import { GoogleBooksApiThumbnailCacheUpdateEntity } from '../../internaldata/googlebooksapithumbnailcache/entity/GoogleBooksApiThumbnailCacheUpdateEntity';
import { GoogleBooksApiThumbnailCacheInsertEntity } from '../../internaldata/googlebooksapithumbnailcache/entity/GoogleBooksApiThumbnailCacheInsertEntity';
import { GoogleBooksApiThumbnailCacheSelectEntity } from '../entity/GoogleBooksApiThumbnailCacheSelectEntity';
import { GoogleBooksApiInfoCacheSelectEntity } from '../entity/GoogleBooksApiInfoCacheSelectEntity';
import { GoogleBooksApiInfoCacheInsertEntity } from '../../internaldata/googlebooksapiinfocache/entity/GoogleBooksApiInfoCacheInsertEntity';
import { GoogleBooksApiInfoCacheUpdateEntity } from '../../internaldata/googlebooksapiinfocache/entity/GoogleBooksApiAuthorsCacheUpdateEntity';
import { GoogleBooksApiAuthorsCacheInsertEntity } from '../../internaldata/googlebooksapiauthorscache/entity/GoogleBooksApiAuthorsCacheInsertEntity';
import { GoogleBooksApiAuthorsCacheSelectEntity } from '../entity/GoogleBooksApiAuthorsCacheSelectEntity';
import { GoogleBooksApiAuthorsCacheDeleteEntity } from '../../internaldata/googlebooksapiauthorscache/entity/GoogleBooksApiAuthorsCacheDeleteEntity';
import { GoogleBooksApiAuthorNoModel } from '../../internaldata/googlebooksapiauthorscache/properties/GoogleBooksApiAuthorNoModel';
import { GoogleBooksApiAuthorNameModel } from '../../internaldata/googlebooksapiauthorscache/properties/GoogleBooksApiAuthorNameModel';
import { BookInfoMasterListSelectEntity } from '../entity/BookInfoMasterListSelectEntity';
import { GoogleBooksApiAccessHistoryRepositoryInterface } from '../../internaldata/googlebooksapiaccesshistory/repository/interface/GoogleBooksApiAccessHistoryRepositoryInterface';
import { BookInfoListModelType } from '../model/BookInfoListModelType';
import { GoogleBooksAPIsVolumeInfoModelType } from '../../externalapi/googlebookinfo/model/GoogleBooksAPIsVolumeInfoModelType';
import { GoogleBooksApiCacheModelType } from '../model/GoogleBooksApiCacheModelType';
import { BookInfoMergedModelType } from '../model/BookInfoMergedModelType';


export class BookSearchService {


    /**
     * Google Books Apiを呼び出す
     * @param keyword 
     */
    public async callGoogleBookApi(keyword: string) {

        try {

            const googleBookInfoApisKeyword = new GoogleBookInfoApisKeyword(keyword);

            // Google Books Apiデータ取得
            const googleBookInfoApis: GoogleBookInfoApis = new GoogleBookInfoApis(googleBookInfoApisKeyword);

            // Google Books Apiを呼び出す
            const googleBookInfoList = await googleBookInfoApis.call();

            return googleBookInfoList;

        } catch (err) {
            throw Error(`ERROR:${err} endpoint:${ENV.BOOK_SEARCH} keyword:${keyword}`);
        }
    }


    /**
     * キーワードと日付でGoogle Books Apiのアクセス履歴をチェックする
     * @param googleBooksApiAccessHistoryList 
     * @param keywordModel 
     * @param accessDateModel 
     */
    public checkAccessHistoryExist(keywordModel: KeywordModel, accessDateModel: AccessDateModel,) {

        const bookSearchJsonRepository = (new BookSearchRepositorys()).get(RepositoryType.JSON);

        const bookSearchGoogleBooksApiAccessHistorySelectEntity =
            new BookSearchGoogleBooksApiAccessHistorySelectEntity(keywordModel, accessDateModel);

        const GoogleBooksApiAccessHistory =
            bookSearchJsonRepository.selectGoogleBooksApiAccessHistory(bookSearchGoogleBooksApiAccessHistorySelectEntity);

        // キーワードと日付に一致するデータが存在する
        return GoogleBooksApiAccessHistory.length > 0
    }


    /**
     * マージされたキャッシュ情報をGoogle Books Api用の型(GoogleBooksAPIsModelItemsType)に変換する
     * @param googleBooksApiCacheMergedList 
     * @returns 
     */
    public parseGoogleBooksAPIsModelItems(googleBooksApiCacheMergedList: ReadonlyArray<GoogleBooksApiCacheModelType>): GoogleBooksAPIsModelItemsType[] {

        const googleBooksAPIsModelItemsTypeList: GoogleBooksAPIsModelItemsType[] = googleBooksApiCacheMergedList.map((e: GoogleBooksApiCacheModelType) => {

            const googleBooksAPIsVolumeInfoModelType: GoogleBooksAPIsVolumeInfoModelType = {
                title: e.title,
                authors: e.authors,
                publishedDate: e.publishedDate,
                imageLinks: {
                    smallThumbnail: e.imageLinks?.smallThumbnail,
                    thumbnail: e.imageLinks?.thumbnail,
                },
                description: e.description,
            };

            return {
                id: e.bookId,
                volumeInfo: googleBooksAPIsVolumeInfoModelType
            }
        });

        return googleBooksAPIsModelItemsTypeList;
    }


    /**
     * Google Books Apiアクセス情報にデータを追加する
     * @param bookInfoMasterCreateModel 
     */
    public createGoogleBookApiAccessHistory(keywordModel: KeywordModel, accessDateModel: AccessDateModel) {

        // Google Books Apiアクセス情報登録用データを作成
        const googleBooksApiAccessHistoryInsertEntity: GoogleBooksApiAccessHistoryInsertEntity =
            new GoogleBooksApiAccessHistoryInsertEntity(keywordModel, accessDateModel);

        return googleBooksApiAccessHistoryInsertEntity;
    }


    /**
     * 書籍マスタ情報をGoogle Books Apiの型に変換する
     * @param mergedBookInfoMasterList 
     * @returns 
     */
    public parseGoogleBooksApiBookInfoMaster(
        bookInfoMasterList: ReadonlyArray<BookInfoListModelType>): GoogleBooksAPIsModelItemsType[] {

        const googleBooksAPIsModelItems: GoogleBooksAPIsModelItemsType[] =
            bookInfoMasterList.map((e: BookInfoMergedModelType) => {

                const googleBooksAPIsVolumeInfo: GoogleBooksAPIsVolumeInfoModelType = {
                    title: e.title,
                    authors: e.authors,
                    publishedDate: e.publishedDate,
                    imageLinks: {},
                    description: e.description,
                }

                return {
                    id: e.bookId,
                    volumeInfo: googleBooksAPIsVolumeInfo
                }
            });

        return googleBooksAPIsModelItems;
    }


    /**
     * 書籍情報マスタとGoogle Books Apiの書籍情報をマージする
     * @param googleBooksApiItems 
     * @param parsedBookInfoMasterList 
     */
    public mergeGoogleBooksApiAndBookInfoMaster(googleBooksApiItems: GoogleBooksAPIsModelItemsType[],
        bookInfoMasterList: GoogleBooksAPIsModelItemsType[],
    ): GoogleBooksAPIsModelItemsType[] {

        // 書籍情報マスタとGoogle Books Apiで同一の書籍が存在する場合は書籍情報マスタを優先する(Google Books Apiを情報を削除する)
        const mergedBookInfoList: GoogleBooksAPIsModelItemsType[] =
            googleBooksApiItems.filter((e: GoogleBooksAPIsModelItemsType) => {

                // タイトルと著者が一致する場合は同一の書籍とする
                const googleBooksAPIsVolume = e.volumeInfo;
                const googleBooksAPIsTitle = googleBooksAPIsVolume.title;
                const googleBooksAPIsAuthorsList = googleBooksAPIsVolume.authors ?? [];

                // 書籍マスタに対して書籍情報一致検索を実行する
                const googleBooksApiItem = bookInfoMasterList.find((e1: GoogleBooksAPIsModelItemsType) => {

                    const bookInfoMasterTitle = e1.volumeInfo.title;
                    const bookInfoMasterAuthorsList = e1.volumeInfo.authors ?? [];

                    return bookInfoMasterTitle === googleBooksAPIsTitle &&
                        ArrayUtil.checkArrayEqual(bookInfoMasterAuthorsList, googleBooksAPIsAuthorsList);
                });

                return !googleBooksApiItem;
            });

        return [...bookInfoMasterList, ...mergedBookInfoList];
    }


    /**
     * Google Books Apiアクセス情報の永続ロジックを取得
     * @returns 
     */
    public getGoogleBooksApiAccessHistoryRepository() {

        return (new GoogleBooksApiAccessHistoryRepositorys()).get(RepositoryType.JSON);
    }


    /**
     * BookSearchの永続ロジックを取得
     */
    public getBookSearchRepository(): BookSearchRepositoryInterface {

        return (new BookSearchRepositorys()).get(RepositoryType.JSON);
    }


    /**
     * Google Books Api書籍の永続ロジックを取得
     */
    public getGoogleBooksApiInfoCacheRepository(): GoogleBooksApiInfoCacheRepositoryInterface {

        return (new GoogleBooksApiInfoCacheRepositorys()).get(RepositoryType.JSON);
    }


    /**
     * Google Books Api著者の永続ロジックを取得
     */
    public getGoogleBooksApiAuthorsCacheRepository(): GoogleBooksApiAuthorsCacheRepositoryInterface {

        return (new GoogleBooksApiAuthorsCacheRepositorys()).get(RepositoryType.JSON);
    }


    /**
     * Google Books Apiのサムネイル(小)の永続ロジックを取得
     */
    public getGoogleBooksApiSmallThumbnailCacheRepository(): GoogleBooksApiSmallThumbnailCacheRepositoryInterface {

        return (new GoogleBooksApiSmallThumbnailCacheRepositorys()).get(RepositoryType.JSON);
    }


    /**
     * Google Books Apiのサムネイルの永続ロジックを取得
     */
    public getGoogleBooksApiThumbnailCacheRepository(): GoogleBooksApiThumbnailCacheRepositoryInterface {

        return (new GoogleBooksApiThumbnailCacheRepositorys()).get(RepositoryType.JSON);
    }


    /**
     * Google Books Apiのキャッシュ情報取得
     */
    public getGoogleBooksApiCacheList(BookSearchRepository: BookSearchRepositoryInterface, keywordModel: KeywordModel) {

        const googleBooksApiCacheSelectEntity = new GoogleBooksApiCacheSelectEntity(keywordModel);

        const googleBooksApiCacheList = BookSearchRepository.selectGoogleBooksApiCacheList(googleBooksApiCacheSelectEntity);

        return googleBooksApiCacheList;
    }


    /**
     * Google Books Apiのサムネイル(小)キャッシュ情報の追加/更新
     * @param googleBooksApiSmallThumbnailCacheRepository 
     * @param googleBooksApiItems 
     */
    public updateGoogleBooksApiSmallThumbnailCache(
        bookSearchRepository: BookSearchRepositoryInterface,
        googleBooksApiSmallThumbnailCacheRepository: GoogleBooksApiSmallThumbnailCacheRepositoryInterface,
        googleBooksApiItems: GoogleBooksAPIsModelItemsType[]) {

        googleBooksApiItems.forEach((e: GoogleBooksAPIsModelItemsType) => {

            // 検索条件
            const googleBooksApiSmallThumbnailCacheSelectEntity =
                new GoogleBooksApiSmallThumbnailCacheSelectEntity(new GoogleBooksApiIdModel(e.id));

            // Google Books Apiのサムネイル(小)キャッシュ情報を取得
            const googleBooksApiSmallThumbnailCacheList =
                bookSearchRepository.selectGoogleBooksApiSmallThumbnailCacheList(googleBooksApiSmallThumbnailCacheSelectEntity);

            const smallThumbnail = e.volumeInfo.imageLinks?.smallThumbnail ?? ``;

            // リストが取得できた場合は更新する
            if (googleBooksApiSmallThumbnailCacheList.length > 0) {

                // 更新条件を作成
                const googleBooksApiSmallThumbnailCacheUpdateEntity =
                    new GoogleBooksApiSmallThumbnailCacheUpdateEntity(
                        new GoogleBooksApiIdModel(e.id),
                        new SmallThumbnailModel(smallThumbnail),
                    );

                // 更新
                googleBooksApiSmallThumbnailCacheRepository.update(googleBooksApiSmallThumbnailCacheUpdateEntity);
            }
            // リストが取得できない場合は登録
            else {

                // 登録条件を作成
                const googleBooksApiSmallThumbnailCacheInsertEntity =
                    new GoogleBooksApiSmallThumbnailCacheInsertEntity(
                        new GoogleBooksApiIdModel(e.id),
                        new SmallThumbnailModel(smallThumbnail),
                    );

                // 登録
                googleBooksApiSmallThumbnailCacheRepository.insert(googleBooksApiSmallThumbnailCacheInsertEntity);
            }
        });
    }


    /**
     * Google Books Apiのサムネイルキャッシュ情報の追加/更新データを作成する
     * @param googleBooksApiThumbnailCacheRepository 
     * @param googleBooksApiItems 
     */
    public updateGoogleBooksApiThumbnailCache(
        bookSearchRepository: BookSearchRepositoryInterface,
        googleBooksApiThumbnailCacheRepository: GoogleBooksApiThumbnailCacheRepositoryInterface,
        googleBooksApiItems: GoogleBooksAPIsModelItemsType[]) {

        googleBooksApiItems.forEach((e: GoogleBooksAPIsModelItemsType) => {

            // 検索条件
            const googleBooksApiThumbnailCacheSelectEntity =
                new GoogleBooksApiThumbnailCacheSelectEntity(new GoogleBooksApiIdModel(e.id));

            // Google Books Apiのサムネイルキャッシュ情報を取得
            const googleBooksApiThumbnailCacheList =
                bookSearchRepository.selectGoogleBooksApiThumbnailCacheList(googleBooksApiThumbnailCacheSelectEntity);

            const thumbnail = e.volumeInfo.imageLinks?.thumbnail ?? ``;

            // リストが取得できた場合は更新する
            if (googleBooksApiThumbnailCacheList.length > 0) {

                // 更新条件を作成
                const googleBooksApiThumbnailCacheUpdateEntity =
                    new GoogleBooksApiThumbnailCacheUpdateEntity(
                        new GoogleBooksApiIdModel(e.id),
                        new ThumbnailModel(thumbnail),
                    );

                // 更新
                googleBooksApiThumbnailCacheRepository.update(googleBooksApiThumbnailCacheUpdateEntity);
            }
            // リストが取得できない場合は登録
            else {

                // 登録条件を作成
                const googleBooksApiThumbnailCacheInsertEntity =
                    new GoogleBooksApiThumbnailCacheInsertEntity(
                        new GoogleBooksApiIdModel(e.id),
                        new ThumbnailModel(thumbnail),
                    );

                // 登録
                googleBooksApiThumbnailCacheRepository.insert(googleBooksApiThumbnailCacheInsertEntity);
            }
        });
    }


    /**
     * Google Books Apiの書籍キャッシュ情報の追加/更新データを作成する
     * @param googleBooksApiThumbnailCacheRepository 
     * @param googleBooksApiItems 
     */
    public updateGoogleBooksApiInfoCache(
        bookSearchRepository: BookSearchRepositoryInterface,
        googleBooksApiInfoCacheRepository: GoogleBooksApiInfoCacheRepositoryInterface,
        googleBooksApiItems: GoogleBooksAPIsModelItemsType[]) {

        googleBooksApiItems.forEach((e: GoogleBooksAPIsModelItemsType) => {

            const bookId = e.id;

            // 検索条件
            const googleBooksApiInfoCacheSelectEntity =
                new GoogleBooksApiInfoCacheSelectEntity(new GoogleBooksApiIdModel(bookId));

            // Google Books Apiの書籍キャッシュ情報を取得
            const googleBooksApiInfoCacheList =
                bookSearchRepository.selectGoogleBooksApiInfoCacheList(googleBooksApiInfoCacheSelectEntity);

            const title = e.volumeInfo.title ?? ``;
            const publishedDate = e.volumeInfo.publishedDate ?? ``;
            const description = e.volumeInfo.description ?? ``;

            // リストが取得できた場合は更新する
            if (googleBooksApiInfoCacheList.length > 0) {

                // 更新条件を作成
                const googleBooksApiInfoCacheUpdateEntity =
                    new GoogleBooksApiInfoCacheUpdateEntity(
                        new GoogleBooksApiIdModel(bookId),
                        new GoogleBooksApiTitleModel(title),
                        new GoogleBooksApiPublishedDateModel(publishedDate),
                        new GoogleBooksApiDescriptionModel(description)
                    );

                // 更新
                googleBooksApiInfoCacheRepository.update(googleBooksApiInfoCacheUpdateEntity);
            }
            // リストが取得できない場合は登録
            else {

                // 登録条件を作成
                const googleBooksApiInfoCacheInsertEntity =
                    new GoogleBooksApiInfoCacheInsertEntity(
                        new GoogleBooksApiIdModel(bookId),
                        new GoogleBooksApiTitleModel(title),
                        new GoogleBooksApiPublishedDateModel(publishedDate),
                        new GoogleBooksApiDescriptionModel(description)
                    );

                // 登録
                googleBooksApiInfoCacheRepository.insert(googleBooksApiInfoCacheInsertEntity);
            }
        });
    }


    /**
     * Google Books Apiの著者キャッシュ情報の追加/更新データを作成する
     * @param googleBooksApiThumbnailCacheRepository 
     * @param googleBooksApiItems 
     */
    public updateGoogleBooksApiAuthorsCache(
        bookSearchRepository: BookSearchRepositoryInterface,
        googleBooksApiAuthorsCacheRepository: GoogleBooksApiAuthorsCacheRepositoryInterface,
        googleBooksApiItems: GoogleBooksAPIsModelItemsType[]) {

        googleBooksApiItems.forEach((e: GoogleBooksAPIsModelItemsType) => {

            const bookId = e.id;

            // 検索条件
            const googleBooksApiAuthorsCacheSelectEntity =
                new GoogleBooksApiAuthorsCacheSelectEntity(new GoogleBooksApiIdModel(bookId));

            // Google Books Apiの書籍キャッシュ情報を取得
            const googleBooksApiAuthorsCacheList =
                bookSearchRepository.selectGoogleBooksApiAuthorsCacheList(googleBooksApiAuthorsCacheSelectEntity);

            const title = e.volumeInfo.title ?? ``;
            const authroList = e.volumeInfo.authors ?? [];

            // リストが取得できた場合は更新(削除+登録)する
            if (googleBooksApiAuthorsCacheList.length > 0) {

                // 削除条件を作成
                const googleBooksApiAuthorsCacheDeleteEntity =
                    new GoogleBooksApiAuthorsCacheDeleteEntity(
                        new GoogleBooksApiIdModel(bookId),
                    );

                // 削除
                googleBooksApiAuthorsCacheRepository.delete(googleBooksApiAuthorsCacheDeleteEntity);

                // 著者リストを登録する
                authroList.forEach((e: string, index: number) => {

                    const authorName = e;

                    // 登録条件を作成
                    const googleBooksApiAuthorsCacheInsertEntity =
                        new GoogleBooksApiAuthorsCacheInsertEntity(
                            new GoogleBooksApiIdModel(bookId),
                            new GoogleBooksApiAuthorNoModel(index),
                            new GoogleBooksApiAuthorNameModel(authorName),
                        );

                    // 登録
                    googleBooksApiAuthorsCacheRepository.insert(googleBooksApiAuthorsCacheInsertEntity);
                });

            }
            // リストが取得できない場合は登録
            else {

                // 著者リストを登録する
                authroList.forEach((e: string, index: number) => {

                    const authorName = e;

                    // 登録条件を作成
                    const googleBooksApiAuthorsCacheInsertEntity =
                        new GoogleBooksApiAuthorsCacheInsertEntity(
                            new GoogleBooksApiIdModel(bookId),
                            new GoogleBooksApiAuthorNoModel(index),
                            new GoogleBooksApiAuthorNameModel(authorName),
                        );

                    // 登録
                    googleBooksApiAuthorsCacheRepository.insert(googleBooksApiAuthorsCacheInsertEntity);
                });
            }
        });
    }


    /**
     * Google Books Apiのサムネイルキャッシュ情報の追加/更新データを作成する
     * @param googleBooksApiThumbnailCacheRepository 
     * @param googleBooksApiItems 
     */
    public insertGoogleBooksApiAccessHistory(
        googleBooksApiAccessHistoryRepository: GoogleBooksApiAccessHistoryRepositoryInterface,
        keywordModel: KeywordModel, accessDateModel: AccessDateModel) {

        // Google Books Apiアクセス情報登録用データを作成
        const googleBooksApiAccessHistoryInsertEntity: GoogleBooksApiAccessHistoryInsertEntity =
            new GoogleBooksApiAccessHistoryInsertEntity(keywordModel, accessDateModel);

        // Google Books Apiアクセス情報ファイルにデータを書き込む
        googleBooksApiAccessHistoryRepository.insert(googleBooksApiAccessHistoryInsertEntity);
    }


    /**
     * 書籍マスタリストを取得する
     * @param googleBooksApiThumbnailCacheRepository 
     * @param googleBooksApiItems 
     */
    public getBookInfoMasterList(bookSearchRepository: BookSearchRepositoryInterface,
        keywordModel: KeywordModel) {

        const bookInfoMasterListSelectEntity = new BookInfoMasterListSelectEntity(keywordModel);

        const bookInfoMasterList = bookSearchRepository.selectBookInfoMasterList(bookInfoMasterListSelectEntity);

        return bookInfoMasterList;
    }


    /**
     * コミット
     * @param googleBooksApiInfoCacheRepository 
     * @param googleBooksApiAuthorsCacheRepository 
     * @param googleBooksApiSmallThumbnailCacheRepository 
     * @param googleBooksApiThumbnailCacheRepository 
     * @param googleBooksApiAccessHistoryRepository 
     */
    public commit(googleBooksApiInfoCacheRepository: GoogleBooksApiInfoCacheRepositoryInterface,
        googleBooksApiAuthorsCacheRepository: GoogleBooksApiAuthorsCacheRepositoryInterface,
        googleBooksApiSmallThumbnailCacheRepository: GoogleBooksApiSmallThumbnailCacheRepositoryInterface,
        googleBooksApiThumbnailCacheRepository: GoogleBooksApiThumbnailCacheRepositoryInterface,
        googleBooksApiAccessHistoryRepository: GoogleBooksApiAccessHistoryRepositoryInterface
    ) {

        googleBooksApiInfoCacheRepository.commit();
        googleBooksApiAuthorsCacheRepository.commit();
        googleBooksApiSmallThumbnailCacheRepository.commit();
        googleBooksApiThumbnailCacheRepository.commit();
        googleBooksApiAccessHistoryRepository.commit();
    }
}