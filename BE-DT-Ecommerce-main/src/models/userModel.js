import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import ApiError from '~/utils/ApiError'
const USER_COLLECTION_NAME='users'
const USER_COLLECTION_SCHEMA= Joi.object(
    {   
        firstName:Joi.string().required().max(50).trim().strict(),
        lastName:Joi.string().required().max(50).trim().strict(),
         password:Joi.string().required().min(5).max(50).trim().strict(),
         email:Joi.string().required().min(5).max(50).trim().strict(),
        // passwork:Joi.string().required().min(5).max(50).trim().strict(),
         createAt: Joi.date().timestamp('javascript').default(Date.now),
         address:Joi.array().default([])
    }
).unknown(true)
const create = async (data)=>
{
    try{
    const dataUser = await USER_COLLECTION_SCHEMA.validateAsync(data,{abortEarly: false})
    const result = await GET_DB().collection(USER_COLLECTION_NAME).insertOne(dataUser)
    const getDataUser = await GET_DB().collection(USER_COLLECTION_NAME).findOne(result.insertedId)
    console.log(getDataUser)
    return getDataUser
    }
    catch (error)
   
    {   
      throw new Error(error)
    }

}
const get = async (dataUser)=>
{
    try 
    {
        const result = await GET_DB().collection(USER_COLLECTION_NAME).findOne(dataUser) 
        console.log(result)
        if (!result) throw new ApiError(401,'Invalid username or password')
        return result
    } 
    catch (error)
    {
          throw new ApiError(401,'Invalid username or password')
    }
}
const getall = async (dataUser)=>
{
    try 
    {
        const result = await GET_DB().collection(USER_COLLECTION_NAME).find({}).toArray()
        console.log(result)
        if (!result) throw new ApiError(401,'Invalid username or password')
        return result
    } 
    catch (error)
    {
          throw new ApiError(401,'Invalid username or password')
    }
}

export const userModel = {
    USER_COLLECTION_NAME,
    USER_COLLECTION_SCHEMA,
    create,
    get,getall
}