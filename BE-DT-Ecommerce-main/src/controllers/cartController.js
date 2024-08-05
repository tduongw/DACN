import { StatusCodes} from 'http-status-codes';
import ApiError from '../utils/ApiError';
import { categoryService } from '~/services/categoryService';
import { cartService } from '~/services/cartServide';
import { cartModel } from '~/models/cartModel';

const getCart=async (req,res,next)=>{
    try 
    {
        console.log('denday')
        const idUser=req.body.idUser
      const cart =await cartService.get(idUser)

      res.status(StatusCodes.OK).json(cart)
    }
    catch (error)
    {   
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY,Error(error).message))

}

}
const updateCart=async (req,res,next)=>{
    try 
    {  const idUser=req.body.idUser
      const data={
        image: req.body.image,
        title: req.body.title,
        price: req.body.price,
        originalPrice: req.body.originalPrice,
        categoryName: req.body.categoryName,
        outOfStock:req.body.outOfStock,
        numofpus: req.body.numofpus,
        brand:     req.body.brand,
        qty:1,
        _id:req.body._id
      }
      console.log(idUser,req.body,'lllllllllllllllllll',data)

      const cart =await cartService.update(data, idUser)
     console.log('toi daY')
     console.log(cart)
      res.status(201).json(cart)

    }
    catch (error)
    {   console.log('k loi nha')
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY,Error(error).message))

}

}
const removeCart=async (req,res,next)=>{
  try 
  {  
    console.log('dsds')
    const data=req.params.idProduct
    const idUser=req.body.idUser
    const returnUpdate = await cartModel.deleteProduct(data,idUser)
    res.status(201).json(returnUpdate)

  }
  catch (error)
  {   console.log('k loi nha')
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY,Error(error).message))

}

}
const changeCart=async (req,res,next)=>{
  try 
  {  
    const data=req.params.idProduct
    const idUser=req.body.idUser
    const typeChange=req.body.action.type
    const returnUpdate = await cartModel.changeCart(data,idUser,typeChange)
    res.status(201).json(returnUpdate)

  }
  catch (error)
  {   console.log('k loi nha')
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY,Error(error).message))

}

}
export const cartController ={
    getCart,
    updateCart,
    removeCart,changeCart

}