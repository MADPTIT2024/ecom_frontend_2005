import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import React, { useContext } from 'react'
import Product from './pages/Product'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Success from './pages/Success'
import AddressForm from './components/AddressForm'
import Checkout from './components/Checkout'

function App() {
  // const { user } = useContext(AuthContext)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:category' element={<ProductList />} />
        <Route path='/product/:type/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/success' element={<Success />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/address' element={<AddressForm />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
