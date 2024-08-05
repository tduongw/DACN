import ApiError from '~/utils/ApiError'
import { GET_DB } from '../config/mongodb'
import { ObjectId } from 'mongodb'
const ADDRESS_COLLECTION_NAME='users'
const get =async ()=>
{
    try{
        // eslint-disable-next-line quotes
        const user= await GET_DB().collection('users').find({}).toArray()
       const order= await GET_DB().collection('order').find({}).toArray()
       const product=await GET_DB().collection('product').find({}).toArray()
       let totalPrice=0
       order.map(ord=>totalPrice+=ord.grandTotal)
       return {user: user.length, order:order.length, product:product.length, grandTotal:totalPrice}
    }
    catch (error)
    {    
        console.log('toi day')
        console.log(error)
         throw  new ApiError(401,'can not get statis')
    }
}

export const statisModel = {

    get
}