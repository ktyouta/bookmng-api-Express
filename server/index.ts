import { BookSearchController } from './booksearch/controller/BookSearchController';
import ENV from './env.json';

const express = require('express');
const app = express();

// 書籍検索
const bookSearchController = new BookSearchController();

app.use('/', bookSearchController.router);

app.listen(ENV.PORT, () => {
    console.log('Server listening on port 3001');
});