import { BookSearchController } from './booksearch/controller/BookSearchController';

const express = require('express');
const app = express();

// 書籍検索
const bookSearchController = new BookSearchController();

app.use('/', bookSearchController.router);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});