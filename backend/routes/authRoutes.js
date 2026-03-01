import express from "express";
import {signup, login, getProfile} from "../controller/usercontroller.js"
import authMiddleware from '../middleware/auth.js';
const router = express.Router();

router.post('/signup',signup);
router.post('/login', login)
router.get('/me', authMiddleware, getProfile);
export default router;

