import express from "express";
const router = express.Router();

import { CreateComment, UpdateComment, DeleteComment } from "../controllers/commentController.js";
import { authVerifier } from '../middleware/tokenAuthHandler.js';

router.post('/createComment', authVerifier, CreateComment);
router.put('/updateComment/:commentId', authVerifier, UpdateComment);
router.delete('/deleteComment/:commentId', authVerifier, DeleteComment);

export default router;