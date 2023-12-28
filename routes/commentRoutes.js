import express from "express";
const router = express.Router();

import { CreateComment, UpdateComment, DeleteComment, GetAllComments } from "../controllers/commentController.js";
import { authVerifier } from '../middleware/tokenAuthHandler.js';

router.post('/createComment', authVerifier, CreateComment);
router.put('/updateComment/:commentId', authVerifier, UpdateComment);
router.delete('/deleteComment/:commentId', authVerifier, DeleteComment);
router.get('/comments-list', authVerifier, GetAllComments);

export default router;