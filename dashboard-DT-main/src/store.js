import { configureStore } from '@reduxjs/toolkit'
import productRedux from './components/redux/productReducer'
export default configureStore({
  reducer: {
    product:productRedux
  }
})