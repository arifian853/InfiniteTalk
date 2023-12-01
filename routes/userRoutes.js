import express from 'express';
const router = express.Router();
import { UserRegistrationMentor, UserRegistrationMentee, UserLogin, UserProfile, UpdateUserProfile, GenerateOTP, VerifyOTP, DisableOTP, ValidateOTP, UpdateProfilePicture } from '../controllers/userController.js';
import { runValidation, validationRegister, validationLogin } from '../validator/validator.js';
import { authVerifier } from '../middleware/tokenAuthHandler.js';

router.post('/signup-mentor', validationRegister, runValidation, UserRegistrationMentor);
router.post('/signup', validationRegister, runValidation, UserRegistrationMentee);
router.post('/signin', validationLogin, runValidation, UserLogin);
router.get('/profile', authVerifier, UserProfile);
router.put('/updateProfile', authVerifier, UpdateUserProfile);
router.put("/updateProfilePicture", authVerifier, UpdateProfilePicture);

router.post('/otp/generate', GenerateOTP);
router.post('/otp/verify', VerifyOTP);
router.post('/otp/validate', ValidateOTP);
router.post('/otp/disable', DisableOTP);

export default router;