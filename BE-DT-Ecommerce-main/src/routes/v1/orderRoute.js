import express from 'express';
import { orderController } from '~/controllers/orderController';
import { auth } from '~/middlewares/auth';
const Router= express.Router();

Router.route('/')
.get(
  orderController.getOrder
)
.post(auth.verifyToken,orderController.createOrder
)
export const orderRoute=Router
