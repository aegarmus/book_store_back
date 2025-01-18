import { Router } from 'express';
import { uploadFileMiddleware } from '../middlewares/uploadFile.middleware.js';
import { createBook } from '../controllers/libro.controller.js';


const router = Router();

router.post('/libro', uploadFileMiddleware('image/book', 'image'), createBook);

export default router;