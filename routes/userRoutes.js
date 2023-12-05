import express from 'express';
const router = express.Router();
import { UserRegistrationMentor, UserRegistrationMentee, UserLogin, UserProfile, UpdateUserProfile, UpdateProfilePicture } from '../controllers/userController.js';
import { runValidation, validationRegister, validationLogin } from '../validator/validator.js';
import { authVerifier } from '../middleware/tokenAuthHandler.js';

router.post('/signup-mentor', validationRegister, runValidation, UserRegistrationMentor);
router.post('/signup', validationRegister, runValidation, UserRegistrationMentee);
router.post('/signin', validationLogin, runValidation, UserLogin);
router.get('/profile', authVerifier, UserProfile);
router.put('/updateProfile', authVerifier, UpdateUserProfile);
router.put('/updateProfilePicture', authVerifier, UpdateProfilePicture);

export default router;