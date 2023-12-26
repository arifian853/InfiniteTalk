import express from 'express';
import { CreatePost, UpdatePost, DeletePost, GetPost, GetAllPosts } from '../controllers/postController.js'; 
import { authVerifier } from '../middleware/tokenAuthHandler.js';

const router = express.Router();

router.post('/create', authVerifier, CreatePost);
router.put('/update/:slug', authVerifier, UpdatePost);
router.get('/all', GetAllPosts);
router.delete('/delete/:slug', authVerifier, DeletePost); 
router.get('/detail/:slug', GetPost);
 
export default router;