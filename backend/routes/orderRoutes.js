import express from 'express';
import {
  addOrderItems,
  getMyOrders,
  getOrders,
  updateOrderStatus,
  deleteOrder,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/my').get(protect, getMyOrders);
router
  .route('/:id/status')
  .put(protect, admin, updateOrderStatus);
router.route('/:id').delete(protect, deleteOrder);

export default router;
