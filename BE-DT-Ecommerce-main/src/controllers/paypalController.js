import { StatusCodes} from 'http-status-codes';
import ApiError from '../utils/ApiError';
const readPaypal=async (req,res,next)=>{
    try 
    {
         console.log(req.body)
         res.status(200).json(req.body)
    }
    catch (error)
    {   
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY,Error(error).message))

}

}
export const paypalController ={
    readPaypal

}