// public
export const PUBLIC = `./public`;
// jsonフォルダ
export const JSON_FOLDER = `/json`;
// マスタフォルダ
export const MASTER_FOLDER = `/master`;
// トランザクションフォルダ
export const TRANSACTION_FOLDER = `/transaction`;
// ログフォルダ
export const LOG_FOLDER = `/log`;


// マスタファイルパス
export const MASTER_FILE_PATH = `${PUBLIC}${JSON_FOLDER}${MASTER_FOLDER}/`;
// トランザクションファイルパス
export const TRANSACTION_FILE_PATH = `${PUBLIC}${JSON_FOLDER}${TRANSACTION_FOLDER}/`;
// ログファイルパス
export const LOG_FILE_PATH = `${PUBLIC}${LOG_FOLDER}/`;


// ログファイル名
export const INFO_LOG_FILE = `info.log`;
// ログファイル名(警告)
export const WARN_LOG_FILE = `warn.log`;
// ログファイル名(エラー)
export const ERROR_LOG_FILE = `error.log`;


// 書籍情報マスタファイル名
export const BOOK_INFO_MASTER_FILE = "book_info_master.json";
// 書籍著者マスタファイル名
export const BOOK_AUTHORS_MASTER_FILE = "book_authors_master.json";
// 著者マスタファイル名
export const AUTHORS_MASTER_FILE = "authors_master.json";
// Google Books Apiアクセストランザクションファイル名
export const GOOGLE_BOOKS_API_ACCESS_HISTORY_TRANSACTION_FILE = "google_books_api_access_history_transaction.json";

// Google Books Api書籍情報キャッシュファイル名
export const GOOGLE_BOOKS_API_INFO_CACHE_FILE = "google_books_api_info_cache.json";
// Google Books Api著者名キャッシュファイル名
export const GOOGLE_BOOKS_API_AUTHORS_CACHE_FILE = "google_books_api_authors_cache.json";
// Google Books Apiサムネイルキャッシュファイル名
export const GOOGLE_BOOKS_API_THUMBNAIL_CACHE_FILE = "google_books_api_thumbnail_cache.json";

// 本棚情報
export const BOOKSHELF_FILE = "bookshelf_transaction.json";
// 本棚検索条件
export const BOOKSHELF_SEARCHCONDITION_FILE = "bookshelf_searchcondition_master.json";


// フロントのユーザーマスタファイル名
export const FRONT_USER_INFO_MASTER_FILE = "front_user_info_master.json";
// フロントのユーザーログインマスタファイル名
export const FRONT_USER_LOGIN_MASTER_FILE = "front_user_login_master.json";