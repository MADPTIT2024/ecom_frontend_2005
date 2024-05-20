import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react'
import { AuthContext } from './AuthContext'
import axios from 'axios'

// Tạo context
const CartContext = createContext()

// Tạo Provider
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const { user } = React.useContext(AuthContext)

  const fetchCart = useCallback(async () => {
    try {
      if (user) {
        const res = await axios.get(
          `http://localhost:8004/view-carts/${user?.id}`
        )
        setCart(res.data)
        console.log(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }, [user])

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export { CartProvider, useCart }
export default CartContext
