import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

import { useEffect, useReducer } from "react";
import { productReducer } from '../components/redux/productReducer';
import { GiConsoleController } from 'react-icons/gi';

const ProductContext = createContext();
export const ProductProdvider = ({ children }) => {
  const initialState = {
    isProuductLoading: false,
    isCategoryLoading: false,
    isDetailLoading: false,
    productData: [],
    categoriesData: [],
    userData:[],
  };
  const [productState, productDispatch] = useReducer(
    productReducer,
    initialState
  );

  const getData = async () => {
    try {
      console.log('data')
      productDispatch({type: 'products_loading', payload: true})

      const { status, data } = await axios({
        method: "GET",
        url: "https://bedutu.onrender.com/v1/product/products",
      });
      console.log(status,'dataaaaaa', data)
      if (status === 200) {
        productDispatch({ type: "set_products", payload: data });
        productDispatch({type: 'products_loading', payload: false})
      }
    } catch (e) {
      console.log('errorrrrrrrrr',e);
    }
  };

  const getCategories = async () => {
    try {
      productDispatch({type: 'categories_loading', payload: true})
      const { status, data } = await axios({
        method: "GET",
        url: "https://bedutu.onrender.com/v1/category",
      });
      if (status === 200) {
        productDispatch({ type: "set_category", payload: data });
        productDispatch({type: 'categories_loading', payload: false})
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getUser = async () => {
    try {
      productDispatch({type: 'user_loading', payload: true})
      const { status, data } = await axios({
        method: "GET",
        url: "https://bedutu.onrender.com/v1/user/allUser",
      });
      if (status === 200) {
        console.log(data,'data')
        productDispatch({ type: "set_user", payload: data });
        productDispatch({type: 'user_loading', payload: false})
      }
    } catch (e) {
      console.log(e);
    }
  };


  const getStatis = async () => {
    try {
      productDispatch({type: 'statis_loading', payload: true})
      const { status, data } = await axios({
        method: "GET",
        url: "https://bedutu.onrender.com/v1/statis",
      });
      if (status === 200) {
        console.log(data,'data')
        productDispatch({ type: "set_statis", payload: data });
        productDispatch({type: 'statis_loading', payload: false})
      }
    } catch (e) {
      console.log(e);
    }
  };
   

  useEffect(() => {
    getStatis();
    getData();
    getCategories();
    getUser();
  }, []);

  return (
    <ProductContext.Provider value={{ productState, productDispatch, getData ,getStatis}}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);