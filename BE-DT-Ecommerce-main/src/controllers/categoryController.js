import { StatusCodes} from 'http-status-codes';
import ApiError from '../utils/ApiError';
import { categoryService } from '~/services/categoryService';
import { cloudCategory } from '~/services/cloudinaryService';
const getCategory=async (req,res,next)=>{
    try 
    {
        console.log('denday')
      const category =await categoryService.get()

      res.status(StatusCodes.OK).json(category)
    }
    catch (error)
    {   
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY,Error(error).message))

}

}
const createCategory=async (req,res,next)=>{
    try 
    {

      const img_url = await cloudCategory(req.file.path)
      const data={...req.body, image:img_url.url}
      const category =await categoryService.create(data)

      res.status(StatusCodes.OK).json(category)
    }
    catch (error)
    {   
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY,Error(error).message))

}

}
export const categoryController ={
    getCategory,
    createCategory

}