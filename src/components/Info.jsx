import * as React from 'react'
import PropTypes from 'prop-types'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { useCart } from '../context/CartContext'
import { useEffect } from 'react'

const products = [
  {
    name: 'Professional plan',
    desc: 'Monthly subscription',
    price: '$15.00',
  },
  {
    name: 'Dedicated support',
    desc: 'Included in the Professional plan',
    price: 'Free',
  },
  {
    name: 'Hardware',
    desc: 'Devices needed for development',
    price: '$69.99',
  },
  {
    name: 'Landing page template',
    desc: 'License',
    price: '$49.99',
  },
]

function Info({ totalPrice }) {
  const { cart } = useCart()
  const [total, setTotal] = React.useState(0)

  useEffect(() => {
    setTotal(
      cart.products
        ?.reduce(
          (total, product) =>
            total + parseFloat(product.price) * product.quantity,
          0
        )
        .toFixed(2)
    )
  }, [cart.products])
  console.log(cart)
  return (
    <React.Fragment>
      <Typography variant='subtitle2' color='text.secondary'>
        Total
      </Typography>
      <Typography variant='h4' gutterBottom>
        {total}
      </Typography>
      <List disablePadding>
        {cart.products?.map((product) => (
          <ListItem key={product.id} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={product.title}
              secondary={product.description}
            />
            <Typography variant='body1' fontWeight='medium'>
              {product.price} x {product.quantity}
            </Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  )
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
}

export default Info
