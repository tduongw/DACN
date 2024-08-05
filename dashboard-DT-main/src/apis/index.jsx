import axiosInstance from './axiosInstance';
import env from "react-dotenv";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'
import { useProducts } from '../contexts/ContextProduct';
export const responseLoginApi = async(dataUser)=>
{  try{
    const infoUser= await axiosInstance.post(`https://bedutu.onrender.com/v1/user/signin`, dataUser)
    console.log(infoUser)
    return infoUser.data
}
catch(error)
{
    return false
}
}
export const responseAddProductApi = async(dataProduct)=>
{  try{

    const id = toast.loading("Please wait...",{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
        console.log(dataProduct,'777777777777')
    console.log('eeeeeeeeeeee222',process.env.REACT_APP_SERVER_HOST,'adasds',`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_HOST}/v1/products/product`)
    const infoProduct= await axiosInstance.post(`https://bedutu.onrender.com/v1/product/products`, dataProduct)
    console.log(infoProduct)
    if (infoProduct.status==201){ toast.update(id, { render: "Success", type: "success", isLoading: false,autoClose: 5000, }) 

    console.log('vccccccccccccccc')
    }
    return infoProduct
}
catch(error)
{   console.log('eeeeeeeeeeee',process.env.REACT_APP_SERVER_HOST)
    return false
}
}
export const responseEditProductApi = async(dataProduct, idProduct)=>
{  try{
    const id = toast.loading("Please wait...",{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
        console.log(dataProduct,'777777777777')
    console.log('eeeeeeeeeeee222',process.env.REACT_APP_SERVER_HOST,'adasds',`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_HOST}/v1/products/product`)
    const infoProduct= await axiosInstance.post(`https://bedutu.onrender.com/v1/product/${idProduct}`, dataProduct)
    console.log(infoProduct)
    if (infoProduct.status==201){ toast.update(id, { render: "Success", type: "success", isLoading: false,autoClose: 2000, }) 
  
    }
    return infoProduct
}
catch(error)
{   console.log('eeeeeeeeeeee',process.env.REACT_APP_SERVER_HOST)
    return false
}
}
export const getDetailProduct= async (idProduct) => {
    try {
      productDispatch({type: 'products_loading', payload: true})
     console.log('idProduct',idProduct)
      const { status, data } = await axios({
        method: "GET",
        url: `https://bedutu.onrender.com/v1/product/${idProduct}`,
      });
      console.log(status,'dataaaaaa', data)
      if (status === 200) {
        return data
        console.log('dataaa',data)
      }
    } catch (e) {
      console.log('errorrrrrrrrr',e);
    }
  };
  export const responseDeleteProductApi = async(idProduct)=>
{  try{
    const id = toast.loading("Please wait...",{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
    
    console.log('eeeeeeeeeeee222',process.env.REACT_APP_SERVER_HOST,'adasds',`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_HOST}/v1/products/product`)
    const infoProduct= await axiosInstance.delete(`https://bedutu.onrender.com/v1/product/${idProduct}`)
    console.log(infoProduct)
 
    if (infoProduct.status==201){ toast.update(id, { render: "Success", type: "success", isLoading: false,autoClose: 2000, }) 
   

      console.log('ssss')
    }
    return infoProduct
}
catch(error)
{   console.log('eeeeeeeeeeee',process.env.REACT_APP_SERVER_HOST)
    return false
}
}
