import Joi from 'joi'
Joi.objectId = require('joi-objectid')(Joi)
import { GET_DB } from '../config/mongodb'
import { ObjectId } from 'mongodb'
const PRODUCT_COLLECTION_NAME='product'
const PRODUCT_COLLECTION_SCHEMA= Joi.object(
    {   
        idUser: Joi.string().required().strict(),
        valueRat: Joi.number().required().default(0),
       cmt:Joi.string().required().strict(),
       createAt: Joi.date().timestamp('javascript').default(Date.now),
        name:Joi.string().required().strict(),
    }
)
const create =async (data,idProduct)=>
{
    try{
    
    //  const dataReviewCreate = await PRODUCT_COLLECTION_SCHEMA.validateAsync(data, {abortEarly: false})
     const dataReviewCreate=data
       const result = await GET_DB().collection(PRODUCT_COLLECTION_NAME).findOne({_id: new ObjectId(idProduct)})
      const newReview=result?.review||[]
      newReview.push(dataReviewCreate)
      const ratingV=(result.ratings.value*result.ratings.count+data.valueRat)/(result.ratings.count+1)
      const ratingC=result.ratings.count+1
      const result2 = await GET_DB().collection(PRODUCT_COLLECTION_NAME).updateOne({_id: new ObjectId(idProduct)},{$set:{review:newReview, ratings:{value:ratingV,count:ratingC}}})
      const result3 = await GET_DB().collection(PRODUCT_COLLECTION_NAME).findOne({_id: new ObjectId(idProduct)})
       return result3
    }
    catch (error)
    {
        console.log(error)
         throw new Error(error)
    }
}
export const commentModel={
    create,
    PRODUCT_COLLECTION_NAME,
    PRODUCT_COLLECTION_SCHEMA
}