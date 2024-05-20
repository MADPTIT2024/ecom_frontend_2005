import React, { createContext, useState, useContext } from 'react'

// Tạo context
const OrderContext = createContext()

// Tạo Provider
const OrderProvider = ({ children }) => {
  const [shipment, setShipment] = useState({})
  const [payment, setPayment] = useState({})
  const [order, setOrder] = useState({})

  return (
    <OrderContext.Provider
      value={{
        shipment,
        setShipment,
        order,
        setOrder,
        payment,
        setPayment,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

const useOrder = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrder must be used within a OrderProvider')
  }
  return context
}

export { OrderProvider, useOrder }
export default OrderContext
