import { StatusCodes} from 'http-status-codes';
import ApiError from '../utils/ApiError';

import { commentModel } from '~/models/commentModel';

const create =async (req, res, next)=>{
    try {
      const idProduct=req.params.id
       const data=req.body

               const returnProductService=await commentModel.create(data, idProduct)
               res.status(StatusCodes.CREATED).json(returnProductService)
    }
    catch (error)
    {   
     

        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY,Error(error).message))
    }


}



export const commentController =
{
    create,
 
    

}




