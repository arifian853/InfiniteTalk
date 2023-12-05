import express from 'express';
const router = express.Router();
import { GenerateOTP, VerifyOTP, DisableOTP, ValidateOTP } from '../controllers/userController.js'

router.post('/generate', GenerateOTP);
router.post('/verify', VerifyOTP);
router.post('/validate', ValidateOTP);
router.post('/disable', DisableOTP);

export default router;