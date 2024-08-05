import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject,Search, Toolbar } from '@syncfusion/ej2-react-grids';
import {Button} from '../components';
import { ordersData, contextMenuItems, ordersGrid, ProductsGrid, CategoryGrid } from '../data/dummy';
import { Header } from '../components';
import { useProducts } from '../contexts/ContextProduct';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Category = () => {
  
  const {currentColor} =useStateContext()
  console.log('mau', currentColor)
  const data=useProducts()
  console.log(data)
  console.log(data,'       dsadsadsa')
  const editing = { allowDeleting: true, allowEditing: true, allowSearching:true };
  const toolbarOptions = ['Search'];
  const navigate=useNavigate()
  const addCategory =()=>
  {
    navigate("/products/add")
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <ToastContainer />
      <div style={{display: "flex"}}>
      <Header category="Page" title="Category" />
        <div style={{textAlign:"right", marginTop:'60px',float: "right", marginLeft:'auto',marginRight:'2px'}}>
      <button onClick={addCategory} style={{backgroundColor:currentColor,borderRadius:"5px", color:"white", height:'35px', padding:"4px",textAlign:"right"}}  >New Category</button>
      </div>
      </div>
      {data.productState.productData? 
      <GridComponent
        id="gridcomp"
        toolbar={toolbarOptions}
        dataSource={data.productState.categoriesData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        allowSearching={true}
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {CategoryGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
       
        </ColumnsDirective>
        <Inject services={[Search,Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport,Toolbar]} />
      </GridComponent>
:<></>}
    </div>
  );
};
export default Category;