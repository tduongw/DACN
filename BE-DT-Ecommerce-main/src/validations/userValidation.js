import Joi from 'joi'
import {
	StatusCodes,
} from 'http-status-codes';


const login=async (req, res, next)=>
{
   const correct =Joi.object(
    {
        phone: Joi.string().required().min(8).max(50),
    }
   )
   try {
     await correct.validateAsync(req.body, {abortEarly: false})
    console.log(req.body)
    next()

   }
   catch (error)
   {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        errors: new Error(error).message
    })
   }


}
export const userValidation =
{
    login
}

