import express from "express";
import { createBook, destroyBook, findAllBooks, findBooksByOneAuthor, findBooksBySearch, findBooksNotChecked, findOneBook, updateBook } from "../Controllers/Book.js";
import { checkAdminOrMod, checkAuthentication } from "../Middlewares/CheckAuthentication.js";

const router = express.Router();

router.post('/', checkAuthentication, createBook)
router.put('/:bookid', checkAuthentication, checkAdminOrMod, updateBook)
router.get('/:bookid', checkAuthentication, findOneBook)
router.get('/search/:search', checkAuthentication, findBooksBySearch)
router.get('/all/tocheck', checkAuthentication, checkAdminOrMod, findBooksNotChecked)
router.get('/author/:authorid', checkAuthentication, findBooksByOneAuthor)
router.get('/', checkAuthentication, findAllBooks)
router.delete('/:bookid', checkAuthentication, checkAdminOrMod, destroyBook)

export default router