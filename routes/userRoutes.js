import express from 'express';
const router = express.Router();
import { UserRegistration, UserLogin, UserProfile, UpdateUserProfile } from '../controllers/userController.js';
import { runValidation, validationRegister, validationLogin } from '../validator/validator.js';
import { authVerifier } from '../middleware/tokenAuthHandler.js';

router.post('/signup', validationRegister, runValidation, UserRegistration);
router.post('/signin', validationLogin, runValidation, UserLogin);
router.get('/profile', authVerifier, UserProfile);
router.put('/updateProfile', authVerifier, UpdateUserProfile);

export default router;