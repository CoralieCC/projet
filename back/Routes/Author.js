import express from "express";
import { authorById, authorsBySearch, createAuthor, findAllAuthors } from "../Controllers/Author.js";
import { checkAuthentication } from "../Middlewares/CheckAuthentication.js";

const router = express.Router();

router.post('/', checkAuthentication, createAuthor)
router.get('/', checkAuthentication, findAllAuthors)
router.get('/search/:search', checkAuthentication, authorsBySearch)
router.get('/:authorid', checkAuthentication, authorById)

export default router