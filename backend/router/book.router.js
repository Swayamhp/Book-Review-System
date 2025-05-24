import express from 'express';
import { addBook, getAllBooks, getSingleBook } from '../controller/books.controller.js';

const router = express.Router();

router.post('/books',addBook);
router.get('/books',getAllBooks);
router.get('/books/:id',getSingleBook);

export default router;