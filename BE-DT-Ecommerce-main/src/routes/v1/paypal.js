import express from 'express';

import { paypalController } from '~/controllers/paypalController';

const Router= express.Router();

Router.route('/')
.post(paypalController.readPaypal
)
export const paypalRoute=Router