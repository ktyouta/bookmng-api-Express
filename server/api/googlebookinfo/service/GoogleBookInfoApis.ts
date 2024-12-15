import ENV from '../../../env.json';
import express, { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { ApiClient } from '../../../util/ApiClient';
import { GoogleBooksAPIsModelType } from '../model/GoogleBooksAPIsModelType';
import { QueryBuilder } from '../../../util/QueryBuilder';


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
    public async getGoogleBookInfo(keyword?: string): Promise<GoogleBooksAPIsModelType> {

        // クエリパラメータ作成用オブジェクト
        const queryBuilder: QueryBuilder = new QueryBuilder();
        // 最大取得件数をパラメータにセット
        queryBuilder.addQuery(`${ENV.GOOGLE_BOOKS_API_QUERYKEY_MAXRESULTS}`, `${ENV.GOOGLE_BOOKS_API_MAXRESULTS}`);

        // キーワードが存在する場合はクエリパラメータに設定する
        if (!keyword) {
            queryBuilder.addQuery(`${ENV.GOOGLE_BOOKS_API_QUERYKEY_KEYWORD}`, `${keyword}`);
        }

        // クエリパラメータ
        let queryPrm = queryBuilder.createQueryStr();
        queryPrm = queryPrm ? `?${queryPrm}` : "";

        try {
            // Google Books Apiを呼び出す
            const response: GoogleBooksAPIsModelType = await this.apiClient.get(`${this.GOOGLE_BOOK_API_BASE_URL}${queryPrm}`);
            return response;

        } catch (err) {

            let errMsg = `Google Books Apiの呼び出しでエラーが発生しました。
                 \r\n url:${this.GOOGLE_BOOK_API_BASE_URL}
                 \r\n keyword:${keyword}
                 \r\n err:${err}`;

            console.log(errMsg);
            throw Error(errMsg);
        }
    }
}