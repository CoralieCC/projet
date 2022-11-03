import express from "express";
import { authentication } from "../Controllers/User.js"

const router = express.Router();

router.post('/', authentication);

export default router