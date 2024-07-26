import express from 'express';
import { formularioLogin } from '../Controllers/userController.js';
import { formularioRegister } from '../Controllers/userController.js';

const router = express.Router();

router.get('/login', formularioLogin)
router.get('/register', formularioRegister)

export default router