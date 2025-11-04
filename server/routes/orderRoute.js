import express from 'express';
import authUser from '../middlewares/authUser.js';
import authSeller from '../middlewares/authSeller.js';

import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
  placeOrderRazorpay,     // NEW (Stripe → Razorpay)
  verifyPaymentRazorpay,  // NEW
} from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD);
orderRouter.get('/user', authUser, getUserOrders);
orderRouter.get('/seller', authSeller, getAllOrders);

// ⬇️ REPLACE the old Stripe route
// orderRouter.post('/stripe', authUser, placeOrderStripe);

// ⬇️ NEW Razorpay routes
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);
orderRouter.post('/razorpay/verify', authUser, verifyPaymentRazorpay);

export default orderRouter;