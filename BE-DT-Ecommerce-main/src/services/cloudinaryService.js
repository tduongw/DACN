import ApiError from '~/utils/ApiError';
import { settingCloudinary } from '~/config/cloudinary';
export const cloud=async(files)=>
{
  try{
    const returnPath = await Promise.all(files.map(async (image) => {
      const result = await settingCloudinary.uploader.upload(image.path, { folder: 'product' });
      console.log('rrrrrrrrrrrrrr', result.url);
      return result.url;
    }));
    
    return returnPath;
}
catch (error) 
{
  throw new ApiError(400,'error from cloudinary')}
}

export const cloudCategory=async(pathImage)=>
{
  try{

const result=await settingCloudinary.uploader.upload(pathImage, {folder:'category'})
console.log(result)
  return result
}
catch (error) 
{
  throw new ApiError(400,'error from cloudinary')}
}