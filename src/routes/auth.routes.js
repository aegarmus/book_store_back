import { Router } from 'express';
import { login, register, updatePassword } from '../controllers/auth.controller.js';
import { getAllUsers } from '../controllers/usuario.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';


const router = Router();

router.post('/usuario', register);
router.post('/usuario/login', login);
router.patch('/usuario/:id', authMiddleware, updatePassword);
router.get('/usuario', authMiddleware, getAllUsers);

export default router;