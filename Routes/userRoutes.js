import express from 'express';
import { formularioLogin, 
         formularioSignin,
         signin,
         verify,
         forgotPassword } from '../Controllers/userController.js';


const router = express.Router();

router.get('/login', formularioLogin)
router.get('/signin', formularioSignin)
router.post('/signin', signin)
router.get('/forgot-pass', forgotPassword)

router.get('/verify/:token',verify)

export default router