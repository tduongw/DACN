import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../components';
import { useOrder } from '../contexts/ContextOrder';
const Orders = () => {

  const data=useOrder()
  console.log('dataaaaaaaaaaaaa',data.orderState.orderData)
  const editing = { allowDeleting: true, allowEditing: true };
  const arrayOrder=[]
  if (data.orderState.orderData && data.orderState.orderData.length > 0)
  data.orderState.orderData.map((item)=>{
    const dt={
      id: item._id,
      receiver: item.address.name,
      total:item.grandTotal,
      creatAt: item.creatAt||1704540302800,
      products: item.products[0].title,
      address:`${item.address.street},${item.address.subdi},${item.address.town},${item.address.city}`,
      status:'success'
    }
    arrayOrder.push(dt)
  })
  console.log('dtdtttttttttttttt',arrayOrder)
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
      <GridComponent
        id="gridcomp"
        dataSource={arrayOrder}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
    </div>
  );
};
export default Orders;
