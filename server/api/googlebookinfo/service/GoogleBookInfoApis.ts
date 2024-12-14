import ENV from '../../../env.json';
import express, { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { ApiClient } from '../../../util/ApiClient';
import { GoogleBooksAPIsModelType } from '../model/GoogleBooksAPIsModelType';


export class GoogleBookInfoApis {

    private readonly GOOGLE_BOOK_API_URL: string;
    private readonly apiClient: ApiClient;

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

        if (!ENV.GOOGLE_BOOKS_API_QUERYKEY) {
            throw Error("設定ファイルにGoogle Books Apiのクエリキーが存在しません。");
        }

        this.GOOGLE_BOOK_API_URL = `${ENV.GOOGLE_BOOKS_API_PROTOCOL}${ENV.GOOGLE_BOOKS_API_DOMAIN}${ENV.GOOGLE_BOOKS_API_PATH}`;
        this.apiClient = new ApiClient();
    }


    /**
     * Google Books Apiを呼び出す
     */
    public async getGoogleBookInfo(keyword?: string) {

        // キーワードが存在する場合はクエリパラメータを設定する
        const queryParam = keyword ? `?${ENV.GOOGLE_BOOKS_API_QUERYKEY}=${keyword}` : "";

        try {
            // Google Books Apiを呼び出す
            const response: GoogleBooksAPIsModelType = await this.apiClient.get(`${this.GOOGLE_BOOK_API_URL}${queryParam}`);
            return response;

        } catch (err) {

            let errMsg = `Google Books Apiの呼び出しでエラーが発生しました。
                 \r\n url:${this.GOOGLE_BOOK_API_URL}
                 \r\n keyword:${keyword}
                 \r\n err:${err}`;

            console.log(errMsg);
            throw Error(errMsg);
        }
    }
}