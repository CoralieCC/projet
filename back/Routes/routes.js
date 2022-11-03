import express from "express";
import authRouter from './Authentication.js'
import registerRouter from './Register.js'
import bookRouter from './Book.js'
import reviewRouter from './Review.js'
import commentRouter from './Comment.js'
import authorRouter from './Author.js'
import userRouter from './User.js'

const router = express.Router();

router.use('/login', authRouter)
router.use('/register', registerRouter)
router.use('/book', bookRouter)
router.use('/review', reviewRouter)
router.use('/comment', commentRouter)
router.use('/author', authorRouter)
router.use('/user', userRouter)


export default router