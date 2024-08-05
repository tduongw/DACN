import express from 'express';
import { statisController } from '~/controllers/statisController';


const Router= express.Router();

Router.route('/')
.get(statisController.getStatis
)
export const statisRoute=Router