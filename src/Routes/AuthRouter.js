import { signUp, signIn } from '../Controllers/AuthControler.js';
import { Router } from 'express';

const router = Router();

router.post('/cadastro', signUp);
router.post('/login', signIn);

export default router;