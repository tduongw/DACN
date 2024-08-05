import ApiError from '~/utils/ApiError'
import { GET_DB } from '../config/mongodb'
const CATEGORY_COLLECTION_NAME='category'
const get =async ()=>
{
    try{
        // eslint-disable-next-line quotes
      const dataCategory = await GET_DB().collection(CATEGORY_COLLECTION_NAME).find({}).toArray()
      await console.log('datra',dataCategory)

       return dataCategory
    }
    catch (error)
    {    
        console.log('toi day')
        console.log(error)
         throw  new ApiError(401,'Invalid username or password')
    }
}
const create = async (data)=>
{
   try{
    console.log('ddddddd',data)
    const result = await GET_DB().collection(CATEGORY_COLLECTION_NAME).insertOne(data)
    console.log(result)
    const returnCate = await GET_DB().collection(CATEGORY_COLLECTION_NAME).findOne({_id: result.insertedId})
    return returnCate
   }
   catch( error)
   {
    throw new ApiError(401,'loi category')
   }

}
export const categoryModel = {
    CATEGORY_COLLECTION_NAME,
    create,
    get
}