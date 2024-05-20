import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AuthContextProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { OrderProvider } from './context/OrderContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AuthContextProvider>
    <CartProvider>
      <OrderProvider>
        <App />
      </OrderProvider>
    </CartProvider>
  </AuthContextProvider>
)
