import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';

import {  ProductProdvider } from './contexts/ContextProduct';
import { OrderProdvider } from './contexts/ContextOrder';

ReactDOM.render(
  <React.StrictMode>
    <OrderProdvider>
    <ProductProdvider>
    <ContextProvider>
      <App />
    </ContextProvider>
    </ProductProdvider>
    </OrderProdvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
