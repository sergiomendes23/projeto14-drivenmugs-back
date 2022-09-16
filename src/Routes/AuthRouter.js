import { Router } from 'express';
import signUp from '../Controllers/SignUpController.js';
import validateSignUp from '../Middlewares/SignUpMiddleware.js';
import { signIn } from '../Controllers/AuthControler.js';

const router = Router();

router.post('/cadastro', validateSignUp, signUp);
router.post('/login', signIn);

export default router;