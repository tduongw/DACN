export const orderReducer = (state, action) => {
    switch (action.type) {
      case "order_loading":
        return { ...state, isOrderLoading: action.payload };
  
      case "set_order":
        return { ...state, orderData: action.payload };
   
      default:
        return state;
    }
  };