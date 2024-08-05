import ApiError from '~/utils/ApiError'
import { GET_DB } from '../config/mongodb'
import { ObjectId } from 'mongodb'
import Joi from 'joi'
Joi.objectId = require('joi-objectid')(Joi)
const ORDER_COLLECTION_SCHEMA= Joi.object(
    {    
        idUser:Joi.string().required().min(5).strict(),
        codePaypal: Joi.string().required().min(5).strict(),
        grandTotal: Joi.number().required().default(0),
        createAt: Joi.date().timestamp('javascript').default(Date.now),
        products: Joi.array(),
        address: Joi.object()


        // title: Joi.string().required().min(5).strict(),
        // image:Joi.array().required().strict(),
        // price: Joi.number().required().default(0),
        // originalPrice: Joi.number().required().default(0),
        // categoryName: Joi.string().required().min(5).trim().strict(),
        // outOfStock: Joi.boolean(),

        // //categoryId: Joi.objectId().default(null),
        // //description: Joi.string().required().min(5).max(5000).trim().strict().default('mo ta cccc à'),
        // createAt: Joi.date().timestamp('javascript').default(Date.now),
        // numofpus: Joi.number().required().default(0),
        // ratings: Joi.object({
        //     value: Joi.number().required().default(0),
        //     count: Joi.number().required().default(0),
        // }),
        // brand: Joi.string().required().min(0).strict(),
    
    }
)
const ORDER_COLLECTION_NAME='order'
const getOrder =async ()=>
{
    try{
        
        // eslint-disable-next-line quotes
      const dataOrder = await GET_DB().collection(ORDER_COLLECTION_NAME).find({}).toArray()
      await console.log('datra',dataOrder)

       return dataOrder
    }
    catch (error)
    {    
        console.log('toi day')
        console.log(error)
         throw  new ApiError(401,'Invalid username or password')
    }
}
const createOrder = async (data)=>
{
   try{
    console.log('den day')
    // const dataOrderCreate = await ORDER_COLLECTION_SCHEMA.validateAsync(data, {abortEarly: false})
    console.log('den day')
    const result = await GET_DB().collection(ORDER_COLLECTION_NAME).insertOne(data)
    const updateCart = await GET_DB().collection('cart').updateOne({idUser:data.idUser},{$set:{cart:[]}})
      console.log('den day', result)
    const returnAddress = await GET_DB().collection(ORDER_COLLECTION_NAME).find().toArray()
    return returnAddress
   }
   catch( error)
   {
    throw new ApiError(401,'loi order')
   }

}
export const orderModel = {
    ORDER_COLLECTION_NAME,
    createOrder,
    getOrder
}