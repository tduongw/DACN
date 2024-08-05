import { userModel } from "~/models/userModel"
import { auth } from "~/middlewares/auth"
const create = async(dataUser)=>
{
    try {
         console.log('1111111111111111111111ddddddd',dataUser)
        const userModelReturn = await userModel.create(dataUser)
         return userModelReturn
        }
    catch(error)
    {
      console.log(error)
    throw new Error(error)
    }

}
const signIn = async (dataUser) =>
{
    try{
       const result=await userModel.get(dataUser)
       const initUser={
        id: result._id,
        firstname: result.firstname,
        lastName: result.lastame,
        email: result.email,
       }
       const token=auth.createToken(initUser)
       initUser.token=token
       return initUser
       
    }
       catch (error)
       {
        throw new Error(error)
       }

    }
export const userService =
{ 

    create,
    signIn
}