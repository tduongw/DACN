import React, { useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject,Search, Toolbar } from '@syncfusion/ej2-react-grids';
import {Button} from '../components';
import { ordersData, contextMenuItems, ordersGrid, ProductsGrid } from '../data/dummy';
import { Header } from '../components';
import { useProducts } from '../contexts/ContextProduct';
import { useStateContext } from '../contexts/ContextProvider';
import { FormThemeProvider, TextArea } from 'react-form-component'
import axios from 'axios';
import Form, {
    Input,
    Select,
    SubmitButton,
    ImageUpload,
    GalleryUpload
  } from 'react-form-component'
import { getDetailProduct, responseAddProductApi, responseEditProductApi } from '../apis';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useReducer } from "react";
import { productReducer } from '../components/redux/productReducer'; 

import { useNavigate, useParams } from 'react-router-dom';



export default function EditProduct()

{

    const [productState, productDispatch] = useReducer(
        productReducer,

      );
    const onClickAddProduct =async (fields)=>{
        const formData = new FormData();

// Thêm các hình ảnh vào mảng files

// Đặt mỗi hình ảnh vào cùng một trường 'images'
fields.image.forEach((file, index) => {
    console.log(`image[${index}]`, file.dataFile);

  formData.append(`image`, file.dataFile);
});
formData.append(`title`, fields.title);
formData.append(`price`, fields.price);
formData.append(`numofpus`, fields.numofpus);
formData.append(`brand`, fields.brand);
formData.append(`categoryName`, fields.categoryName);
formData.append(`sale`, fields.sale);
formData.append('description',fields.description)
console.log(fields.image,'datafile')
        const returnDataProduct =await responseEditProductApi(formData,idProduct)
        navigate('/products')
    
    }
const { idProduct } = useParams();

console.log(idProduct)
const [dataProduct,setDataProduct]=useState({})


const [imageUrls, setImageUrls] = useState([]);
  const [imageBlobs, setImageBlobs] = useState([]);



const navigate=useNavigate()




useEffect(() => {
    const getData = async () => {
      try {
        const { status, data } = await axios({
          method: 'GET',
          url: `http://localhost:8017/v1/product/${idProduct}`,

        });
        console.log(status, 'dataaaaaa', data);
        if (status === 200) {
          setDataProduct(data);
          console.log(data.image,'oke');
        

        const responses = await Promise.all(
            
            data.image.map((url) => axios.get(url, { responseType: 'arraybuffer' })))
            const blobs = responses.map((response) =>
        new Blob([response.data], { type: response.headers['content-type'] })
      );

      // Cập nhật state để hiển thị ảnh
      setImageBlobs(blobs);
      console.log(blobs,'blobs')
        }
      } catch (e) {
        console.log('errorrrrrrrrr', e);
      }
    };

    // Gọi hàm getData một lần khi component được tạo ra
    getData();
  }, [idProduct]);
return(

    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
     <ToastContainer/>
    <Header category="Page" title="Edit product" />


      <FormThemeProvider theme={{}}>
      <Form fields={['title', 'brand', 'category', 'price', 'sale','category','numofpus', 'image', 'sale']} mandatory={[]}>
    <Input
      name='title'
      label='Name Product'
      initialValue={dataProduct?.title||''}
    />
       <Select
      name='brand'
      initialValue={dataProduct?.brand||''}
      label='Type of a brand'
      options={['H&M', 'Yody', 'CC']}
    />
        <Select
        initialValue={dataProduct?.categoryName||''}
      name='categoryName'
      label='Type of a category'
      options={['Shirts', 'Shoes', 'Jeans','Polo Shirts']}
    />
    <Input
      name='price'
      label='Price'
      initialValue={dataProduct?.price||''}
    />
    <GalleryUpload
    className=""
    columns="4"
    help="pnd,jpg "
    label="Upload Image"
    name="image"
    initialValue={dataProduct.image}
  />
    

<Input
      name='numofpus'
      label='Num Of Pus'
      initialValue={dataProduct?.numofpus||''}
    />
   <Input
      name='sale'
      label='Sale'
      initialValue={dataProduct?.sale||''}
    />
       <TextArea

help="Help text"
initialValue=""
label="Description"
min={5}
name="description"
placeholder="Placeholder text"
prefix=""
rows={5}
suffix=""
/>
  
    <SubmitButton
      onClick={fields => onClickAddProduct(fields)}
    >Save</SubmitButton>
  </Form>
  </FormThemeProvider>


    </div>
)
}