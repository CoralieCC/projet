import express from "express";
import { createComment, destroyComment, findAllForOneReview, findCommentsToCheck, updateComment } from "../Controllers/Comment.js";
import { checkAdminModCreatorOrReviewCreator, checkAdminModOrCreator, checkAdminOrMod, checkAuthentication, checkCreator } from "../Middlewares/CheckAuthentication.js";


const router = express.Router();

router.post('/', checkAuthentication, createComment)
router.get('/review/:reviewid', checkAuthentication, findAllForOneReview)
router.get('/all/tocheck', checkAuthentication, checkAdminOrMod, findCommentsToCheck)
router.put('/:commentid', checkAuthentication, checkAdminModOrCreator, updateComment)
router.delete('/:commentid/review/:reviewid', checkAuthentication, checkAdminModCreatorOrReviewCreator, destroyComment)

export default router