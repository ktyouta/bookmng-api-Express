import ENV from '../../../env.json';
import express, { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { ApiClient } from '../../../util/service/ApiClient';
import { GoogleBooksAPIsModelType } from '../model/GoogleBooksAPIsModelType';
import { QueryBuilder } from '../../../util/service/QueryBuilder';
import { GoogleBookInfoApisKeyword } from '../../properties/GoogleBookInfoApisKeyword';


export class GoogleBookInfoApis {

    // Google Books ApiのURL
    private readonly _apiUrl: string;
    // api通信用クラス
    private readonly _apiClient: ApiClient = new ApiClient();


    constructor(googleBookInfoApisKeyword: GoogleBookInfoApisKeyword) {

        if (!ENV.GOOGLE_BOOKS_API_PROTOCOL) {
            throw Error("設定ファイルにプロトコルが存在しません。");
        }

        if (!ENV.GOOGLE_BOOKS_API_DOMAIN) {
            throw Error("設定ファイルにGoogle Books Apiのドメインが存在しません。");
        }

        if (!ENV.GOOGLE_BOOKS_API_PATH) {
            throw Error("設定ファイルにGoogle Books Apiのパスが存在しません。");
        }

        if (!ENV.GOOGLE_BOOKS_API_QUERYKEY_KEYWORD) {
            throw Error("設定ファイルにGoogle Books Apiのクエリキー(キーワード)が存在しません。");
        }

        if (!ENV.GOOGLE_BOOKS_API_QUERYKEY_MAXRESULTS) {
            throw Error("設定ファイルにGoogle Books Apiのクエリキー(最大取得件数)が存在しません。");
        }

        if (!ENV.GOOGLE_BOOKS_API_MAXRESULTS) {
            throw Error("設定ファイルにGoogle Books Apiの最大取得件数が存在しません。");
        }

        const apiBaseUrl = `${ENV.GOOGLE_BOOKS_API_PROTOCOL}${ENV.GOOGLE_BOOKS_API_DOMAIN}${ENV.GOOGLE_BOOKS_API_PATH}`;

        // クエリパラメータを作成
        const queryParam = this.createQuery(googleBookInfoApisKeyword);
        this._apiUrl = `${apiBaseUrl}${queryParam ? `?${queryParam}` : ""}`;
    }


    /**
     * Google Books Apiを呼び出す
     */
    public async call(): Promise<GoogleBooksAPIsModelType> {

        try {
            // Google Books Apiを呼び出す
            const response: GoogleBooksAPIsModelType = await this._apiClient.get(this._apiUrl);
            return response;
        } catch (err) {

            const errorDetails = {
                message: `Google Books Apiの呼び出しでエラーが発生しました。`,
                url: this._apiUrl,
                error: err
            };

            throw Error(JSON.stringify(errorDetails));
        }
    }


    /**
     * api用のクエリパラメータを作成する
     * @param googleBookInfoApisKeyword 
     * @returns 
     */
    private createQuery(googleBookInfoApisKeyword: GoogleBookInfoApisKeyword) {

        // 最大取得件数
        const apiMaxResultKey = `${ENV.GOOGLE_BOOKS_API_QUERYKEY_MAXRESULTS}`;
        const apiMaxResultValue = `${ENV.GOOGLE_BOOKS_API_MAXRESULTS}`;
        // 検索キーワード
        const searchKeywordKey = `${ENV.GOOGLE_BOOKS_API_QUERYKEY_KEYWORD}`;
        const searchKeyWordValue = googleBookInfoApisKeyword.keywrod;

        // クエリパラメータ作成用オブジェクト
        const queryBuilder: QueryBuilder = new QueryBuilder(apiMaxResultKey, apiMaxResultValue);

        // キーワードをクエリパラメータにセット
        const addeKeywordqueryBuilder = queryBuilder.add(searchKeywordKey, searchKeyWordValue);

        // クエリパラメータを作成
        return addeKeywordqueryBuilder.createParam();
    }
}