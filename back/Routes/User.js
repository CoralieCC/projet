import express from "express";
import { destroyUser, findAllUsers, getUsername, putUserRole } from "../Controllers/User.js";
import { checkAdmin, checkAuthentication} from "../Middlewares/CheckAuthentication.js";

const router = express.Router()

router.get('/:userid', checkAuthentication, getUsername)
router.get('/', checkAuthentication, checkAdmin, findAllUsers)
router.put('/role/:userid', checkAuthentication, checkAdmin, putUserRole)
router.delete('/:userid', checkAuthentication, checkAdmin, destroyUser)

export default router