import ENV from '../../../env.json';
import express, { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { ApiClient } from '../../../util/service/ApiClient';
import { GoogleBooksAPIsModelType } from '../model/GoogleBooksAPIsModelType';
import { QueryBuilder } from '../../../util/service/QueryBuilder';


export class GoogleBookInfoApis {

    // Google Books ApiのURL
    private readonly GOOGLE_BOOK_API_BASE_URL: string;
    // api通信用クラス
    private readonly apiClient: ApiClient = new ApiClient();

    constructor() {

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

        this.GOOGLE_BOOK_API_BASE_URL = `${ENV.GOOGLE_BOOKS_API_PROTOCOL}${ENV.GOOGLE_BOOKS_API_DOMAIN}${ENV.GOOGLE_BOOKS_API_PATH}`;
    }


    /**
     * Google Books Apiを呼び出す
     */
    public async getGoogleBookInfo(keyword: string): Promise<GoogleBooksAPIsModelType> {

        // Google Books Apiの呼び出しにキーワードが必須のため存在しない場合はエラーにする
        if (!keyword) {
            throw Error("Google Books Apiの呼び出しにはキーワードが必須です。");
        }

        // クエリパラメータ作成用オブジェクト
        const queryBuilder: QueryBuilder = new QueryBuilder();
        // 最大取得件数をパラメータにセット
        queryBuilder.addQuery(`${ENV.GOOGLE_BOOKS_API_QUERYKEY_MAXRESULTS}`, `${ENV.GOOGLE_BOOKS_API_MAXRESULTS}`);

        // キーワードが存在する場合はクエリパラメータに設定する
        queryBuilder.addQuery(`${ENV.GOOGLE_BOOKS_API_QUERYKEY_KEYWORD}`, `${keyword}`);

        // クエリパラメータを作成
        let queryPrm = queryBuilder.createQueryStr();
        // Google Books Api 呼び出し用URL 
        let callApiUrl = `${this.GOOGLE_BOOK_API_BASE_URL}${queryPrm ? `?${queryPrm}` : ""}`;

        try {
            // Google Books Apiを呼び出す
            const response: GoogleBooksAPIsModelType = await this.apiClient.get(callApiUrl);
            return response;

        } catch (err) {

            let errMsg = `Google Books Apiの呼び出しでエラーが発生しました。
                 \r\n url:${callApiUrl}
                 \r\n keyword:${keyword}
                 \r\n err:${err}`;

            console.log(errMsg);
            throw Error(errMsg);
        }
    }
}