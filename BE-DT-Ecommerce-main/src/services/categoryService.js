import ApiError from '~/utils/ApiError';
import { categoryModel } from '~/models/categoryModel';

const create = async(data)=>
{
    try {
        console.log(data)
      const productModelReturn = await categoryModel.create(data)
       return productModelReturn
    }
    catch(error)
    {   
       throw new ApiError(400, 'loi cc')
    }

}
const get = async()=>
{
    try {
        console.log('denday')
      const categoryModelReturn = await categoryModel.get()

       return categoryModelReturn
    }
    catch(error){
throw new ApiError(400, 'loi cc')
}
}

export const categoryService =
{
    create,
    get
}