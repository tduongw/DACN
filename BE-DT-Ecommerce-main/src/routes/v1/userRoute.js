import express from 'express';
import { userController } from '~/controllers/userController';
const Router= express.Router();

Router.route('/')
.post(userController.create )
Router.route(('/signin'))
.post(userController.signIn)
Router.route('/address')
.post()
.get()
Router.route('/alluser')
.get(userController.get)
export const userRoute=Router
