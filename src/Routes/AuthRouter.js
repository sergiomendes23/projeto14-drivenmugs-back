import { Router } from 'express';
import signUp from '../Controllers/SignUpController.js';
import validateSignUp from '../Middlewares/SignUpMiddleware.js';
import signIn from '../Controllers/SignInController.js';
import validateSignIn from '../Middlewares/SignInMiddleware.js';

const router = Router();
router.post('/cadastro', validateSignUp, signUp);
router.post('/login', validateSignIn, signIn);

export default router;