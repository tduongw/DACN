import { env } from './environment';
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: env.CLOUUD_NAME, 
  api_key: env.API_KEY, 
  api_secret: env.API_SECRET 
});
export const settingCloudinary=cloudinary