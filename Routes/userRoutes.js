import express from 'express';
import { formularioLogin, 
         formularioSignin,
         signin,
         verify,
         resetPassword,
         forgotPassword,
         verifyToken,
         newPassword } from '../Controllers/userController.js';


const router = express.Router();

router.get('/login', formularioLogin)

router.get('/signin', formularioSignin)
router.post('/signin', signin)

router.get('/forgot-pass', forgotPassword)
router.post('/forgot-pass',resetPassword)

router.get('/verify/:token',verify)

router.get('/forgot-pass/:token', verifyToken)
router.post('/forgot-pass/:token',newPassword)

export default router