import { Router } from 'express';
import { OrderController } from '@/presentation/controllers/OrderController';

const router = Router();

router.get('/orders', OrderController.getAll);
router.get('/orders/:id', OrderController.getOne);
router.post('/orders', OrderController.create);
router.put('/orders/:id', OrderController.update);
router.delete('/orders/:id', OrderController.delete);

export default router;
