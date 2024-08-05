import express from 'express';
import { categoryController } from '~/controllers/categoryController';
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const Router= express.Router();

Router.route('/')
.get(
  categoryController.getCategory
)
.post(upload.single('image'),
	categoryController.createCategory
)
export const categoryRoute=Router
