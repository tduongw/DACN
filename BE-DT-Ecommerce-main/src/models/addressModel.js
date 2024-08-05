import ApiError from '~/utils/ApiError'
import { GET_DB } from '../config/mongodb'
import { ObjectId } from 'mongodb'
const ADDRESS_COLLECTION_NAME='users'
const get =async (data)=>
{
    try{
        // eslint-disable-next-line quotes
      const dataUser = await GET_DB().collection(ADDRESS_COLLECTION_NAME).findOne({_id: new ObjectId(data)})
      await console.log('datra',dataUser)

       return dataUser.address
    }
    catch (error)
    {    
        console.log('toi day')
        console.log(error)
         throw  new ApiError(401,'Invalid username or password')
    }
}
const create = async (data, idUser)=>
{
   try{
    console.log('ddddddd',data, idUser)
    const dataUser = await GET_DB().collection(ADDRESS_COLLECTION_NAME).findOne({_id: new ObjectId(idUser)})
    console.log('d2',dataUser)
    const dataAddress= dataUser.address
    console.log('d234',dataAddress)
    dataAddress.push(data)
    console.log('d23',data)
    const updateAddress = {
        $set: {
          address: dataAddress
        },
      };
    const result = await GET_DB().collection(ADDRESS_COLLECTION_NAME).updateOne({_id: new ObjectId(idUser)}, updateAddress, { upsert: true })
      console.log('den day')
    const returnAddress = await GET_DB().collection(ADDRESS_COLLECTION_NAME).findOne({_id: new ObjectId(idUser)})
    return returnAddress.address
   }
   catch( error)
   {
    throw new ApiError(401,'loi category')
   }

}
export const addressModel = {
    ADDRESS_COLLECTION_NAME,
    create,
    get
}