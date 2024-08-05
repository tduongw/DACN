import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

import { useEffect, useReducer } from "react";
import { orderReducer } from '../components/redux/orderReducer';

const OrderContext = createContext();
export const OrderProdvider = ({ children }) => {
  const initialState = {
    isOrderLoading: false,

    ordertData: [],
  };
  const [orderState, orderDispatch] = useReducer(
    orderReducer,
    initialState
  );

  const getData = async () => {
    try {
      orderDispatch({type: 'order_loading', payload: true})

      const { status, data } = await axios({
        method: "GET",
        url: "https://bedutu.onrender.com/v1/order",
      });
      console.log(status,'dataaaaaa', data)
      if (status === 200) {
        orderDispatch({ type: "set_order", payload: data });
        orderDispatch({type: 'order_loading', payload: false})
      }
    } catch (e) {
      console.log('errorrrrrrrrr',e);
    }
  };


  useEffect(() => {
    getData();
  }, []);

 

  return (
    <OrderContext.Provider value={{ orderState, orderDispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);