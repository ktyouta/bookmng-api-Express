import { GoogleBooksApiAccessHistoryRepositoryInterface } from "../../internaldata/googlebooksapiaccesshistory/repository/interface/GoogleBooksApiAccessHistoryRepositoryInterface";
import { GoogleBooksApiAuthorsCacheRepositoryInterface } from "../../internaldata/googlebooksapiauthorscache/repository/interface/GoogleBooksApiAuthorsCacheRepositoryInterface";
import { GoogleBooksApiInfoCacheRepositoryInterface } from "../../internaldata/googlebooksapiinfocache/repository/interface/GoogleBooksApiInfoCacheRepositoryInterface";
import { GoogleBooksApiThumbnailCacheRepositoryInterface } from "../../internaldata/googlebooksapithumbnailcache/repository/interface/GoogleBooksApiThumbnailCacheRepositoryInterface";

export class GoogleBooksApiCacheRepositorys {

    private readonly _googleBooksApiInfoCacheRepository: GoogleBooksApiInfoCacheRepositoryInterface;
    private readonly _googleBooksApiAuthorsCacheRepository: GoogleBooksApiAuthorsCacheRepositoryInterface;
    private readonly _googleBooksApiThumbnailCacheRepository: GoogleBooksApiThumbnailCacheRepositoryInterface;
    private readonly _googleBooksApiAccessHistoryRepository: GoogleBooksApiAccessHistoryRepositoryInterface;


    constructor(googleBooksApiInfoCacheRepository: GoogleBooksApiInfoCacheRepositoryInterface,
        googleBooksApiAuthorsCacheRepository: GoogleBooksApiAuthorsCacheRepositoryInterface,
        googleBooksApiThumbnailCacheRepository: GoogleBooksApiThumbnailCacheRepositoryInterface,
        googleBooksApiAccessHistoryRepository: GoogleBooksApiAccessHistoryRepositoryInterface) {

        this._googleBooksApiInfoCacheRepository = googleBooksApiInfoCacheRepository;
        this._googleBooksApiAuthorsCacheRepository = googleBooksApiAuthorsCacheRepository;
        this._googleBooksApiThumbnailCacheRepository = googleBooksApiThumbnailCacheRepository;
        this._googleBooksApiAccessHistoryRepository = googleBooksApiAccessHistoryRepository;
    }

    get googleBooksApiInfoCacheRepository() {
        return this._googleBooksApiInfoCacheRepository;
    }

    get googleBooksApiAuthorsCacheRepository() {
        return this._googleBooksApiAuthorsCacheRepository;
    }

    get googleBooksApiThumbnailCacheRepository() {
        return this._googleBooksApiThumbnailCacheRepository;
    }

    get googleBooksApiAccessHistoryRepository() {
        return this._googleBooksApiAccessHistoryRepository;
    }


    commit() {

        Object.keys(this).forEach((key) => {
            const value = (this as any)[key];

            if (value && typeof value.commit === "function") {
                value.commit();
            }
        });
    }

}