import { createContext, useContext, useEffect, useReducer } from "react";
import { productReducer } from "../reducer/productReducer";
import axios from "axios";
const ProductContext = createContext();

export const ProductProdvider = ({ children }) => {
  const initialState = {
    isProuductLoading: false,
    isCategoryLoading: false,
    isDetailLoading: false,
    productData: [],
    categoriesData: [],
  };
  const [productState, productDispatch] = useReducer(
    productReducer,
    initialState
  );


  const getData = async () => {
    try {
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

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <ProductContext.Provider value={{ productState, productDispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
