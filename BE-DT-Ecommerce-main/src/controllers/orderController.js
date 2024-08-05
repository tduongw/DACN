import { StatusCodes} from 'http-status-codes';
import ApiError from '../utils/ApiError';
import { orderModel } from '~/models/orderModel';
const createOrder=async (req,res,next)=>{
    try 
    {   const data=
        { 
            idUser:req.body.idUser,
        codePaypal: req.body.codePaypal,
        grandTotal: req.body.grandTotal,

        products:  req.body.products,
        address:  req.body.address
        }
        const returnData=await orderModel.createOrder(data)
         console.log('oke')
         res.status(201).json(returnData)
    }
    catch (error)
    {   
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY,Error(error).message))

}

}

const getOrder=async (req,res,next)=>{
    try 
    {
         console.log(req.body)
         const dataModel= await orderModel.getOrder()
         res.status(200).json(dataModel)
    }
    catch (error)
    {   
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY,Error(error).message))

}
}
export const orderController ={
    createOrder,
    getOrder

}