import { Router } from 'express';
import { ProductsController } from '../controllers/products.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

// Public routes
router.get('/', ProductsController.getAll);
router.get('/:id', ProductsController.getById);

// Protected routes (require valid JWT Bearer Token)
router.post('/create', protect, ProductsController.create);
router.delete('/:id', protect, ProductsController.delete);

export default router;
