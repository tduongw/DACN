import express from 'express';

import { auth } from '~/middlewares/auth';
import { commentController } from '~/controllers/commentController';


const Router = express.Router();
Router.route('/:id')
.post(auth.verifyToken2,commentController.create)

export const commentRoute =Router
