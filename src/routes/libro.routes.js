import { Router } from 'express';
import { uploadFileMiddleware } from '../middlewares/uploadFile.middleware.js';
import { createBook } from '../controllers/libro.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { verifyAdmin } from '../middlewares/verifyAdmin.js';


const router = Router();

router.post('/libro', authMiddleware, verifyAdmin,  uploadFileMiddleware('image/book', 'image'), createBook);

export default router;