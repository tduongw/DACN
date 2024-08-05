import ApiError from '~/utils/ApiError';
import { categoryModel } from '~/models/categoryModel';
import { cartModel } from '~/models/cartModel';

const update = async(data, idUser)=>
{
    try {
        console.log(data,idUser)
      const cartModelReturn = await cartModel.update(data,idUser)
       return cartModelReturn
    }
    catch(error)
    {   
       throw new ApiError(400, 'loi cc')
    }

}
const get = async(idUser)=>
{
    try {
        console.log('denday')
      const cartModelReturn = await cartModel.get(idUser)

       return cartModelReturn
    }
    catch(error){
throw new ApiError(400, 'loi cc')
}
}

export const cartService =
{
    update,
    get
}