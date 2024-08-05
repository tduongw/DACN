import { addressModel } from '~/models/addressModel';
import { categoryService } from '~/services/categoryService';
import { cloudCategory } from '~/services/cloudinaryService';
import { StatusCodes} from 'http-status-codes';
import ApiError from '../utils/ApiError';
const getAddress=async (req,res,next)=>{
    try 
    {
        console.log('denday')
      const category =await addressModel.get(req.body.idUser)

      res.status(StatusCodes.OK).json(category)
    }
    catch (error)
    {   
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY,Error(error).message))

}

}
const createAddress=async (req,res,next)=>{
    try 
    {
     console.log(req.body.address)
      const data=req.body.address
      const address =await addressModel.create(data, req.body.idUser)

      res.status(StatusCodes.OK).json(address)
    }
    catch (error)
    {   
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY,Error(error).message))

}

}
export const addressController ={
    getAddress,
    createAddress

}