import express from "express";
import { createReview, destroyReview, findAllForOneBook, findOneReview, findReviewsByOneUser, findReviewsToCheck, updateReview } from "../Controllers/Review.js";
import { checkAdminModOrCreator, checkAdminOrMod, checkAuthentication} from "../Middlewares/CheckAuthentication.js";


const router = express.Router();

router.post('/', checkAuthentication, createReview)
router.get('/book/:bookid', checkAuthentication, findAllForOneBook)
router.get('/:reviewid', checkAuthentication, findOneReview)
router.get('/user/:userid', checkAuthentication, findReviewsByOneUser)
router.get('/all/tocheck', checkAuthentication, checkAdminOrMod, findReviewsToCheck)
router.put('/:reviewid', checkAuthentication, checkAdminModOrCreator, updateReview)
router.delete('/:reviewid', checkAuthentication, checkAdminModOrCreator, destroyReview)

export default router