import { Router } from 'express';
import { login, register } from '../controllers/auth.controller.js';


const router = Router();

router.post('/usuario', register);
router.post('/usuario/login', login);

export default router;