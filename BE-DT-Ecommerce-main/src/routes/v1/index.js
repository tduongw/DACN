
import express from 'express';
import { categoryRoute,  } from './categoryRoute';
import {

} from 'http-status-codes';
import { productRoute } from './productRoute';
import { userRoute } from './userRoute';
import { cartRoute } from './cartRoute';
import { addressRoute } from './address';
import { paypalRoute } from './paypal';
import { orderRoute } from './orderRoute';
import { commentRoute } from './commentRoute';
import { statisRoute } from './statisRoute';

const Router= express.Router();

Router.use('/category',categoryRoute)
Router.use('/user', userRoute)
Router.use('/product', productRoute )
Router.use('/cart', cartRoute )
Router.use('/address', addressRoute)
Router.use('/paypal', paypalRoute)
Router.use('/order',orderRoute)
Router.use('/comment',commentRoute)
Router.use('/statis',statisRoute)
export const APIs_V1=Router
