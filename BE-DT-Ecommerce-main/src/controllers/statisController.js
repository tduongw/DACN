import { StatusCodes} from 'http-status-codes';
import ApiError from '../utils/ApiError';

import { statisModel } from '~/models/statisModel';







const getStatis=async (req,res,next)=>{
    try 
    {
    
         const dataModel= await statisModel.get()
         res.status(200).json(dataModel)
    }
    catch (error)
    {   
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY,Error(error).message))

}
}
export const statisController ={
 getStatis

}