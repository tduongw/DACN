import express from 'express';
import { addressController } from '~/controllers/addressController';
import { auth } from '~/middlewares/auth';
const Router= express.Router();

Router.route('/')
.get(auth.verifyToken,
  addressController.getAddress
)
.post(auth.verifyToken,addressController.createAddress
)
export const addressRoute=Router
