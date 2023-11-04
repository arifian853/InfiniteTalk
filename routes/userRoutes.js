import express from 'express';
const router = express.Router();
import { UserRegistration, UserLogin } from '../controllers/userController.js';
import { runValidation, validationRegister, validationLogin } from '../validator/validator.js';

router.post('/register', validationRegister, runValidation, UserRegistration);
router.post('/login', validationLogin, runValidation, UserLogin);

export default router;