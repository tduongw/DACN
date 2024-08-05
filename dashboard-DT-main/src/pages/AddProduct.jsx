import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject,Search, Toolbar } from '@syncfusion/ej2-react-grids';
import {Button} from '../components';
import { ordersData, contextMenuItems, ordersGrid, ProductsGrid } from '../data/dummy';
import { Header } from '../components';
import { useProducts } from '../contexts/ContextProduct';
import { useStateContext } from '../contexts/ContextProvider';
import { FormThemeProvider, TextArea } from 'react-form-component'
import Form, {
    Input,
    Select,
    SubmitButton,
    ImageUpload,
    GalleryUpload
  } from 'react-form-component'
import { responseAddProductApi } from '../apis';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useReducer } from "react";
import { productReducer } from '../components/redux/productReducer'; 
import { useNavigate } from 'react-router-dom';

export default function AddProduct()

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
formData.append(`description`, fields.description);
        const returnDataProduct =await responseAddProductApi(formData)
        getData()
        navigate('/products')
        console.log(formData,'fdfdfd',returnDataProduct)
      
    }
const navigate=useNavigate()
    const {getData} =useProducts()
return(

    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
     <ToastContainer/>
    <Header category="Page" title="New Product" />


      <FormThemeProvider theme={{}}>
      <Form fields={['title', 'brand', 'category', 'price', 'sale','category','numofpus', 'image', 'sale', 'description']} mandatory={[]}>
    <Input
      name='title'
      label='Name Product'
    />
       <Select
      name='brand'

      label='Type of a brand'
      options={['H&M', 'Yody', 'Sassafras','Urbanic','Zara','Roadster','Dolce & Gabbana', 'Savani','Indya']}
    />
        <Select
      name='categoryName'
      label='Type of a category'
      options={['Shirts', 'Shoes', 'Jeans','Polo Shirts', 'Shorts']}
    />
    <Input
      name='price'
      label='Price'
    />
    <GalleryUpload
    className=""
    columns="4"
    help="pnd,jpg "
    label="Upload Image"
    name="image"
  />
    

<Input
      name='numofpus'
      label='Num Of Pus'
    />
   <Input
      name='sale'
      label='Sale'
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
    >Add</SubmitButton>
  </Form>
  </FormThemeProvider>


    </div>
)
}