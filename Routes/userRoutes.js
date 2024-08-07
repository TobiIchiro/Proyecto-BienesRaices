import express from 'express';
import { formularioLogin, 
         formularioSignin,
         forgotPassword } from '../Controllers/userController.js';


const router = express.Router();

router.get('/login', formularioLogin)
router.get('/signin', formularioSignin)
router.get('/forgot-pass', forgotPassword)

export default router