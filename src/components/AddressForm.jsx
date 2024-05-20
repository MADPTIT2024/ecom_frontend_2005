import * as React from 'react'

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/system'
import { useOrder } from '../context/OrderContext'

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}))

export default function AddressForm() {
  const { shipment, setShipment } = useOrder()

  const [formData, setFormData] = React.useState({
    first_name: '',
    last_name: '',
    address1: '',
    address2: '',
    city: '',
    zip: '',
    country: '',
    province: '',
  })

  // Hàm xử lý thay đổi giá trị của các input và checkbox
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setShipment(formData)
  }
  // console.log(formData)
  console.log(shipment)

  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor='first_name' required>
          First name
        </FormLabel>
        <OutlinedInput
          id='first_name'
          name='first_name'
          type='first_name'
          placeholder='First name'
          autoComplete='first name'
          required
          onChange={handleChange}
        />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor='last_name' required>
          Last name
        </FormLabel>
        <OutlinedInput
          id='last_name'
          name='last_name'
          type='last_name'
          placeholder='Last name'
          autoComplete='last name'
          required
          onChange={handleChange}
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor='address1' required>
          Address line 1
        </FormLabel>
        <OutlinedInput
          id='address1'
          name='address1'
          type='address1'
          placeholder='Street name and number'
          autoComplete='shipping address-line1'
          required
          onChange={handleChange}
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor='address2'>Address line 2</FormLabel>
        <OutlinedInput
          id='address2'
          name='address2'
          type='address2'
          placeholder='Apartment, suite, unit, etc. (optional)'
          autoComplete='shipping address-line2'
          required
          onChange={handleChange}
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor='city' required>
          City
        </FormLabel>
        <OutlinedInput
          id='city'
          name='city'
          type='city'
          placeholder='Hà Đông...'
          autoComplete='City'
          required
          onChange={handleChange}
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor='state' required>
          Province
        </FormLabel>
        <OutlinedInput
          id='province'
          name='province'
          type='province'
          placeholder='Hà Nội...'
          autoComplete='Province'
          required
          onChange={handleChange}
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor='zip' required>
          Zip / Postal code
        </FormLabel>
        <OutlinedInput
          id='zip'
          name='zip'
          type='zip'
          placeholder='12345'
          autoComplete='shipping postal-code'
          required
          onChange={handleChange}
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor='country' required>
          Country
        </FormLabel>
        <OutlinedInput
          id='country'
          name='country'
          type='country'
          placeholder='Việt Nam'
          autoComplete='shipping country'
          required
          onChange={handleChange}
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormControlLabel
          control={<Checkbox name='saveAddress' value='yes' />}
          label='Use this address for payment details'
        />
      </FormGrid>
    </Grid>
  )
}
