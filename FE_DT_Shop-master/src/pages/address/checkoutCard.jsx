import { useNavigate } from "react-router";
import { useAddress } from "../../context/addressContext";
import { useCart } from "../../context/cartContext";
import "./address.css";
import { toast } from "react-toastify";
// import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";


const loadScript = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

export const CheckoutCard = () => {
  const { cart, removeCartData, priceDetails } = useCart();
  const { checkout } = useAddress();
  const navigate = useNavigate();
  console.log(cart,'carttttttttttt', checkout)
  const displayRazorpay = async () => {
  
    
    const response = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!response) {
      alert("Razorpay SDK failed to load, check you internet connection");
      return;
    }
    const options = {
      key: "rzp_test_4hPkeR34PzPm3M",
      amount: Number(priceDetails.totalPrice) * 100,
      currency: "INR",
      name: "ATTIRE",
      description: "Thank you for shopping with us",
      handler: function () {
        toast.success(`Payment of Rs. ${priceDetails.totalPrice} is Succesful`);
        navigate("/order-summary");
        cart.map((item) => removeCartData(item._id));
        setTimeout(() => {
          console.log("Success")
          navigate("/");
        }, 4000);
      },
      theme: {
        color: "#e80071",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  // const createOrder = (data, actions) => {
  //   return actions.order.create({
  //     purchase_units: [
  //       {
  //         amount: {
  //           value: '10.0',  // Đặt giá trị này thành số tiền bạn muốn
  //         },
  //       },
  //     ],
  //   });
  // };
  // const onApprove = async (data, actions) => {
  //   // Thực hiện các thao tác sau khi đơn hàng được xác nhận (approved)
  //   console.log('Order approved:', data.orderID);
  //   const dataOrder={
  //     address: checkout,
  //     products: cart,
  //     grandTotal: priceDetails.totalPrice,
  //      codePaypal:data.orderID
  //   }
  //   try {
  //     console.log('ORderdata',dataOrder)
  //     const { data, status } = await axios({
  //       method: "POST",
  //       url: "http://localhost:8017/v1/order",
  //       data:   dataOrder ,
  //       headers: { authorization: token },
  //     });
  //     if (status === 201) {
  //      console.log('add thanh cong')
  //      toast.success('Order Success', {
  //       position: "top-right",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //       });
  //       setCart([])
  //       navigate('/order')
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   // Gọi endpoint backend để xác nhận đơn hàng (nếu cần)
  // };

  // // Hàm xử lý khi có lỗi trong quá trình tạo đơn hàng
  // const onError = (err) => {
  //   console.error('Error creating order:', err);
  // };
  
  // const createOrder4 = (data, actions) => {
  //   return actions.order.create({
  //     intent: 'CAPTURE', // hoặc 'AUTHORIZE'
  //     purchase_units: [
  //       {
  //         description: 'token',
  //         reference_id: '22222',
  //         amount: {
  //           currency_code: 'USD', // Loại tiền tệ
  //           value: priceDetails.totalPrice, // Số tiền
  //           breakdown: {
  //             item_total: {
  //               currency_code: 'VND',
  //               value: priceDetails.totalPrice, // Tổng giá trị của tất cả các sản phẩm
  //             },
  //           },
  //         },
  //         items: [
  //           {
  //             name: 'Sản phẩm 1',
  //             description: 'Mô tả sản phẩm 1',
  //             unit_amount: {
  //               currency_code: 'USD',
  //               value: priceDetails.totalPrice, // Giá của sản phẩm 1
  //             },
  //             quantity: 1, // Số lượng của sản phẩm 1
  //           },
  //           // Thêm các sản phẩm khác nếu cần
  //         ],
  //       },
  //     ],
  //   });
  // };
  // console.log('ssssssssssssss',priceDetails.totalPrice/24000)
  // const createOrderdd = (amount, actions) => {
  //   return actions.order.create({
  //     intent: 'CAPTURE',
  //     purchase_units: [
  //       {
  //         description: 'token',
  //         reference_id: '22222',
  //         amount: {
  //           currency_code: 'USD', // Đổi thành 'USD'
  //           value: amountFromOutside,
  //           breakdown: {
  //             item_total: {
  //               currency_code: 'USD', // Đổi thành 'USD'
  //               value: amountFromOutside,
  //             },
  //           },
  //         },
  //         items: [
  //           {
  //             name: 'Sản phẩm 1',
  //             description: 'Mô tả sản phẩm 1',
  //             unit_amount: {
  //               currency_code: 'USD', // Đổi thành 'USD'
  //               value: amountFromOutside, // Giá của sản phẩm 1
  //             },
  //             quantity: 1, // Số lượng của sản phẩm 1
  //           },
  //           // Thêm các sản phẩm khác nếu cần
  //         ],
  //       },
  //     ],
  //   });
  // };
 // Thay thế bằng giá trị thực từ bên ngoài
  return (
    <>

      <div className="checkout-details">
        <h4>Order Details</h4>
        <hr />
        <div className="flex-div">
          <p>
            <strong>Item</strong>
          </p>
          <p>
            <strong>Quantity</strong>
          </p>
        </div>
        {cart.map((data) => {
          const { _id, title, qty } = data;
          return (
            <>
              <div key={_id} className="flex-div">
                <p className="title-cart">{title}</p>
                <p>{qty}</p>
              </div>
            </>
          );
        })}
        <hr />
        <div className="flex-div">
          <h4>Price Details</h4>
          <p>{priceDetails.quantity}</p>
        </div>
        <hr />
        <ul className="checkout-price">
          <li>
            <p>Subtotal</p>
            <h4>Rs. {priceDetails.totalOriginalPrice}</h4>
          </li>
          <li>
            <p>Discount</p>
            <h4>
              - Rs. {priceDetails.totalOriginalPrice - priceDetails.totalPrice}
            </h4>
          </li>
          <hr />
          <li>
            <p>Grand Total</p>
            <h4>Rs. {priceDetails.totalPrice}</h4>
          </li>
        </ul>
        <hr />
        <h4>Deliver to</h4>
        <hr />
        {Object.values(checkout)[0].length > 0 ? (
          <div className="final-address">
            <p>
              <strong>{checkout.name}</strong>
            </p>
            <div className="checkout-address">
              <p>{checkout.street}</p>
              <p>
                {checkout.city}, {checkout.state}
              </p>
              <p>{checkout.pincode}</p>
            </div>
          </div>
        ) : <p>No Address Found</p>}

        <button
          disabled={
            Object.values(checkout)[0].length === 0 || cart.length === 0
          }
          onClick={() => {
            displayRazorpay();
          }}
        >
          Place Order
        </button>
        {/* <PayPalScriptProvider options={{ clientId: "AX2IKbNMeLF5Z-3uJ9NTvRbtPqTW2F_uE72CqDxJZe71kMl837jfj5ZCpxdsLSvzkqgGPRYT9gAlgaly"}}>
            <PayPalButtons style={{ layout: "horizontal", shape:'pill',label:'pay'   }} />
        </PayPalScriptProvider>
        <PayPalScriptProvider options={{ clientId: "AX2IKbNMeLF5Z-3uJ9NTvRbtPqTW2F_uE72CqDxJZe71kMl837jfj5ZCpxdsLSvzkqgGPRYT9gAlgaly" }}>
      <PayPalButtons 
        style={{ layout: "horizontal", shape: 'pill', label: 'pay' }} 
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </PayPalScriptProvider>
    <PayPalScriptProvider options={{ clientId: "AX2IKbNMeLF5Z-3uJ9NTvRbtPqTW2F_uE72CqDxJZe71kMl837jfj5ZCpxdsLSvzkqgGPRYT9gAlgaly" }}>
      <PayPalButtons 
        style={{ layout: "horizontal", shape: 'pill', label: 'pay' }} 
        createOrder={createOrder2}
        onApprove={onApprove}
        onError={onError}
      />
    </PayPalScriptProvider> */}
        {/* <PayPalScriptProvider options={{ clientId: "AX2IKbNMeLF5Z-3uJ9NTvRbtPqTW2F_uE72CqDxJZe71kMl837jfj5ZCpxdsLSvzkqgGPRYT9gAlgaly"}}>
            <PayPalButtons style={{ layout: "horizontal", shape:'pill',label:'pay'   }}
              createOrder={createOrder4} />
        </PayPalScriptProvider> */}
    
  
   
      
    
{/* <PayPalScriptProvider options={{ clientId: "AX2IKbNMeLF5Z-3uJ9NTvRbtPqTW2F_uE72CqDxJZe71kMl837jfj5ZCpxdsLSvzkqgGPRYT9gAlgaly"}}>
  <PayPalButtons
    style={{ layout: "horizontal", shape: 'pill', label: 'pay' }}
    createOrder={() => createOrderd(amountFromOutside)}
  />
</PayPalScriptProvider> */}


  {/* <PayPalScriptProvider options={{ clientId: "AX2IKbNMeLF5Z-3uJ9NTvRbtPqTW2F_uE72CqDxJZe71kMl837jfj5ZCpxdsLSvzkqgGPRYT9gAlgaly"}}>
  <PayPalButtons
    style={{ layout: "horizontal", shape: 'pill', label:'pay'}}
    createOrder={createOrderdd}
    onApprove={onApprove}
    onError={onError}
  />
  </PayPalScriptProvider>
  <PayPalScriptProvider options={{ clientId: "AX2IKbNMeLF5Z-3uJ9NTvRbtPqTW2F_uE72CqDxJZe71kMl837jfj5ZCpxdsLSvzkqgGPRYT9gAlgaly"}}>
  <PayPalButtons
    style={{ layout: "horizontal", shape: 'pill', label:'pay'}}
    createOrder={createOrderdd}
    onApprove={onApprove}
    onError={onError}
  />
  </PayPalScriptProvider> */}
  {/* <PayPalScriptProvider options={{ clientId: "AX2IKbNMeLF5Z-3uJ9NTvRbtPqTW2F_uE72CqDxJZe71kMl837jfj5ZCpxdsLSvzkqgGPRYT9gAlgaly"}}>
  <PayPalButtons
    style={{ layout: "horizontal", shape: 'pill', label:'pay'}}
    createOrder={createOrderdd}
    onApprove={onApprove}
    onError={onError}
  />
  </PayPalScriptProvider> */}
      </div>
   
    </>
  );
};
