import { StatusCodes} from 'http-status-codes';
import { auth } from '~/middlewares/auth';
import { userModel } from '~/models/userModel';
import { userService } from '~/services/userService';
import ApiError from '~/utils/ApiError';
const signIn= async (req,res,next)=>{
     try
     {
        const data={
            email: req.body.username,
            password: req.body.password
        }
        console.log(data)
        const result =await userService.signIn(data)
        console.log(result)
        res.status(StatusCodes.OK).json(result)
     }
     catch(error)
     {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY,Error(error).message))
     }
     
}
const create =async (req, res, next)=>
{   
    try 
    {    
        const dataUser =
        {
            ...req.body,
            address:[],
        }
        const result =await userService.create(dataUser)

        const initUser={
            id: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
           }
           const token=auth.createToken(initUser)
           initUser.token=token
    console.log('init',initUser)
        res.status(201).json(initUser)

    }
    catch(error)
{    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY,Error(error).message))
}

}
const get= async (req,res,next)=>{
    try
    {
      
    console.log('222')
       const result =await userModel.getall()
       console.log(result)
       res.status(StatusCodes.OK).json(result)
    }
    catch(error)
    {
       next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY,Error(error).message))
    }
    
}
export const userController = {

    create,
    signIn,
    get,


}