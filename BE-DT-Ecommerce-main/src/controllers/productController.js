import { StatusCodes} from 'http-status-codes';
import { productService } from '../services/productService';
import ApiError from '../utils/ApiError';
import { cloud } from '../services/cloudinaryService';
import { productModel } from '~/models/productModel';

const create =async (req, res, next)=>{
    try {
       console.log('eeeeee',req.files)
       console.log('payman',req.body)
       const price=req.body.price-req.body.price/100*req.body.sale|0
        const idImageProduct= await cloud(req.files);
        const dataProduct={
            image: idImageProduct,
            ratings:{
                count:0,
                 value: 0
            },
            title: req.body.title,
            price: req.body.price,
            originalPrice: price,
            categoryName: req.body.categoryName,
            outOfStock:false,
            description: req.body.description,
            //categoryId: Joi.objectId().default(null),
            //description: Joi.string().required().min(5).max(5000).trim().strict().default('mo ta cccc à'),
            numofpus: req.body.numofpus,
            brand:     req.body.brand,
        }
        console.log('dddddddddddddddddddddddddddddddddddddd',idImageProduct)
               const returnProductService=await productService.create(dataProduct)
               res.status(StatusCodes.CREATED).json(returnProductService)
    }
    catch (error)
    {   
     

        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY,Error(error).message))
    }


}
const edit =async (req, res, next)=>{
    try {
       console.log('eeeeee',req.files)
       console.log('payman',req.body)
       const idProduct=req.params.id
       const price=req.body.price-req.body.price/100*req.body.sale|0
        const idImageProduct= await cloud(req.files);
        const dataProduct={
            image: idImageProduct,
            ratings:{
                count:0,
                 value: 0
            },
            title: req.body.title,
            price: req.body.price,
            originalPrice: price,
            categoryName: req.body.categoryName,
            outOfStock:false,
            description: req.body.description,
            //categoryId: Joi.objectId().default(null),
            //description: Joi.string().required().min(5).max(5000).trim().strict().default('mo ta cccc à'),
            numofpus: req.body.numofpus,
            brand:     req.body.brand,
        }
        console.log('dddddddddddddddddddddddddddddddddddddd',idImageProduct)
               const returnProductService=await productService.edit(dataProduct, idProduct)
               res.status(StatusCodes.CREATED).json(returnProductService)
    }
    catch (error)
    {   
     

        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY,Error(error).message))
    }


}
const getProducts =async (req, res)=>{
    try 
    {
       const products =await productService.get()

       res.status(StatusCodes.OK).json(products)
    }
    catch (error)
    {   
        res.status(400).json(error)


}
}
const getProduct =async (req, res)=>{
    try 
    {   
        const idProduct=req.params.id
       const products =await productService.getDetail(idProduct)

       res.status(StatusCodes.OK).json(products)
    }
    catch (error)
    {   
        res.status(400).json(error)


}
}
const deleteProduct =async (req, res, next)=>{
    try {
       const idProduct=req.params.id
       
               const returnProductService=await productModel.deleteProduct(idProduct)
               res.status(StatusCodes.CREATED).json(returnProductService)
    }
    catch (error)
    {   
     

        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY,Error(error).message))
    }


}
export const productController =
{
    create,
    getProducts,
    getProduct,
    edit, deleteProduct
    

}




