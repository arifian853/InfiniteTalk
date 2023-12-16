import express from 'express';
const router = express.Router();
import { UserRegistrationMentor, UserRegistrationMentee, UserProfile, UpdateUserProfile, UpdateProfilePicture, UserLoginMentor, UserLoginMentee } from '../controllers/userController.js';
import { runValidation, validationRegister, validationLogin } from '../validator/validator.js';
import { authVerifier } from '../middleware/tokenAuthHandler.js';

router.post('/signup-mentor', validationRegister, runValidation, UserRegistrationMentor);
router.post('/signup', validationRegister, runValidation, UserRegistrationMentee);
router.post('/signin-mentor', validationLogin, runValidation, UserLoginMentor);
router.post('/signin', validationLogin, runValidation, UserLoginMentee);
router.get('/profile', authVerifier, UserProfile);
router.put('/updateProfile', authVerifier, UpdateUserProfile);
router.put('/updateProfilePicture', authVerifier, UpdateProfilePicture);

export default router;