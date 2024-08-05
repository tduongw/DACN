import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./authContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { token } = useAuth();
  const [isCartUpdate, setIsCardUpdate] = useState(false);

  const priceDetails = cart.reduce(
    (acc, curr) => ({
      quantity: acc.quantity + Number(curr.qty),
      totalPrice: acc.totalPrice + Number(curr.price) * Number(curr.qty),
      totalOriginalPrice:
        acc.totalOriginalPrice + Number(curr.qty) * Number(curr.originalPrice),
    }),
    { quantity: 0, totalPrice: 0, totalOriginalPrice: 0 }
  );

  const getCartData = async () => {
    try {
      console.log('tototo',token)
      setIsCardUpdate(true);
      const { data, status } = await axios({
        method: "GET",
        url: "https://bedutu.onrender.com//v1/cart",
        headers: { authorization:'Bearer '+token },
      });
      console.log('data///////',data)
      if (status === 200) {
        setCart(data?.cart||[]);
        setIsCardUpdate(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addCartData = async (cartData) => {
    try {
      console.log('cartdata',cartData)
      setIsCardUpdate(true);
      console.log('cartdata',cartData)
      const { data, status } = await axios({
        method: "POST",
        url: "https://bedutu.onrender.com/v1/cart",
        data:   cartData ,
        headers: { authorization: token },
      });
      if (status === 201) {
        setCart(data?.cart);
        setIsCardUpdate(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeCartData = async (dataId) => {
    setIsCardUpdate(true);
    try {
      const { data, status } = await axios({
        method: "DELETE",
        url: `https://bedutu.onrender.com/v1/cart/${dataId}`,
        headers: { authorization: token },
      });
      if (status === 201) {
        setCart(data?.cart);
        setIsCardUpdate(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const changeCartQuantity = async (dataId, updateType) => {
    try {
      setIsCardUpdate(true);
      const { data, status } = await axios({
        method: "POST",
        data: { action: { type: updateType } },
        url: `https://bedutu.onrender.com/v1/cart/${dataId}`,
        headers: { authorization: token },
      });
      if (status === 201) {
        setCart(data?.cart);
        setIsCardUpdate(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // console.log(token)

  useEffect(() => {
    if (token) {
      console.log('sss',token)
      getCartData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <CartContext.Provider
        value={{
          cart,
          setCart,
          getCartData,
          addCartData,
          removeCartData,
          changeCartQuantity,
          priceDetails,
          isCartUpdate,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
};

export const useCart = () => useContext(CartContext);
