import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject,Search, Toolbar } from '@syncfusion/ej2-react-grids';
import {Button} from '../components';
import { ordersData, contextMenuItems, ordersGrid, ProductsGrid, UserGrid } from '../data/dummy';
import { Header } from '../components';
import { useProducts } from '../contexts/ContextProduct';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { garena } from '../apis';

const User = () => {
  
    const {currentColor} =useStateContext()
    const data=useProducts()
    console.log(data.productState.userData)
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <ToastContainer />
      <div style={{display: "flex"}}>
      <Header category="Page" title="Product" />
    
      </div>
      {data.productState.userData? 
      <GridComponent
        id="gridcomp"
 
        dataSource={data.productState.userData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        allowSearching={true}
        contextMenuItems={contextMenuItems}

      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {UserGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
       
        </ColumnsDirective>
        <Inject services={[Search,Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport,Toolbar]} />
      </GridComponent>
:<></>}
    </div>
  );
};
export default User;