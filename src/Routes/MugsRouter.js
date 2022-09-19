import { Router } from 'express';
import {listMugs, retrieveMug } from '../Controllers/MugsController.js';

const router = Router();
router.get('/caneca/:id', retrieveMug);
router.get('/canecas', listMugs);

export default router;