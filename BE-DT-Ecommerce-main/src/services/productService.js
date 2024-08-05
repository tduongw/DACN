import { productModel } from '../models/productModel'
import ApiError from '../utils/ApiError'

const create = async(dataProduct)=>
{
    try {
      const productModelReturn = await productModel.create(dataProduct)
       return productModelReturn
    }
    catch(error)
    {   
       throw new ApiError(400, 'loi cc')
    }

}
const edit = async(dataProduct, idProduct)=>
{
    try {
      const productModelReturn = await productModel.edit(dataProduct,idProduct)
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
      const productModelReturn = await productModel.get()
       return productModelReturn
    }
    catch(error){
        const ttt=new ApiError(400, 'loi cc')
        console.log('ttttttt',ttt)
throw new ApiError(400, 'loi cc')
}
}

const getDetail = async(idProduct)=>
{   
    try {
      const productModelReturn = await productModel.getDetail(idProduct)
       return productModelReturn
    }
    catch(error){
        const ttt=new ApiError(400, 'loi cc')
        console.log('ttttttt',ttt)
throw new ApiError(400, 'loi cc')
}
}
export const productService =
{
    create,
    get,
    getDetail,
    edit
}