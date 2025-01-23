import { Router } from 'express';
import { forgotPassword, login, register, resetPassword, updatePassword } from '../controllers/auth.controller.js';
import { getAllUsers } from '../controllers/usuario.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';


const router = Router();

router.post('/usuario', register);
router.post('/usuario/login', login);
router.patch('/usuario/:id', authMiddleware, updatePassword);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/usuario', getAllUsers);

export default router;