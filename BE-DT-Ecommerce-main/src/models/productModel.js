import Joi from 'joi'
Joi.objectId = require('joi-objectid')(Joi)
import { GET_DB } from '../config/mongodb'
import { ObjectId } from 'mongodb'
const PRODUCT_COLLECTION_NAME='product'
const PRODUCT_COLLECTION_SCHEMA= Joi.object(
    {   
        title: Joi.string().required().min(5).strict(),
        image:Joi.array().required().strict(),
        price: Joi.number().required().default(0),
        originalPrice: Joi.number().required().default(0),
        categoryName: Joi.string().required().min(5).trim().strict(),
        outOfStock: Joi.boolean(),

        //categoryId: Joi.objectId().default(null),
        //description: Joi.string().required().min(5).max(5000).trim().strict().default('mo ta cccc à'),
        createAt: Joi.date().timestamp('javascript').default(Date.now),
        numofpus: Joi.number().required().default(0),
        ratings: Joi.object({
            value: Joi.number().required().default(0),
            count: Joi.number().required().default(0),
        }),
        review: Joi.array().default([]),
        brand: Joi.string().required().min(0).strict(),
        description:Joi.string().required().min(0).strict(),
    
    }
)
const create =async (data)=>
{
    try{
    
      const dataProductCreate = await PRODUCT_COLLECTION_SCHEMA.validateAsync(data, {abortEarly: false})
       console.log(dataProductCreate)
       const result = await GET_DB().collection(PRODUCT_COLLECTION_NAME).insertOne(dataProductCreate)
      const dataProduct = await GET_DB().collection(PRODUCT_COLLECTION_NAME).findOne({_id: result.insertedId})
       console.log(result)
       return dataProduct
    }
    catch (error)
    {
        console.log(error)
         throw new Error(error)
    }
}
const edit =async (data, id)=>
{
    try{
    
      const dataProductCreate = await PRODUCT_COLLECTION_SCHEMA.validateAsync(data, {abortEarly: false})
       console.log(dataProductCreate)
       const result = await GET_DB().collection(PRODUCT_COLLECTION_NAME).updateOne({_id: new ObjectId(id)},{$set:dataProductCreate})
      const dataProduct = await GET_DB().collection(PRODUCT_COLLECTION_NAME).findOne({_id: result.insertedId})
       console.log(result)
       return dataProduct
    }
    catch (error)
    {
        console.log(error)
         throw new Error(error)
    }
}
const get =async ()=>
{
    try{
        // eslint-disable-next-line quotes
      const dataProducts = await GET_DB().collection(PRODUCT_COLLECTION_NAME).find({}).toArray()
      await console.log(dataProducts)
       return dataProducts
    }
    catch (error)
    {    
        console.log('toi day')
        console.log(error)
         throw new Error(error)
    }
}
const getDetail =async (idProduct)=>
{
    try{
        // eslint-disable-next-line quotes
      const dataProduct = await GET_DB().collection(PRODUCT_COLLECTION_NAME).findOne({_id: new ObjectId(idProduct)})
      await console.log(dataProduct)
       return dataProduct
    }
    catch (error)
    {    
        console.log('toi day')
        console.log(error)
         throw new Error(error)
    }
}
const deleteProduct =async (id)=>
{
    try{
    
       const result = await GET_DB().collection(PRODUCT_COLLECTION_NAME).deleteOne({_id: new ObjectId(id)})
       console.log(result)
       return result
    }
    catch (error)
    {
        console.log(error)
         throw new Error(error)
    }
}
export const productModel = {
    PRODUCT_COLLECTION_NAME,
    PRODUCT_COLLECTION_SCHEMA,
    create,
    get, 
    getDetail, edit, deleteProduct

}