import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { get_product_type } from '../data'
import { mobile } from '../responsive'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Autocomplete from '@mui/material/Autocomplete'

const Container = styled.div``

const Title = styled.h1`
  margin: 20px;
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: '0px 20px', display: 'flex', flexDirection: 'column' })}
`

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: '0px' })}
`

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: '10px 0px' })}
`

const Option = styled.option``

const SearchContainer = styled.div`
  margin-left: 60px;
`

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [inputValue, setInputValue] = React.useState('')
  const type_product = useLocation().pathname.split('/')[2]
  const product_url = get_product_type(type_product)
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:800${product_url}/${type_product}s/`
      )
      setProducts(res.data)
    }
    fetchData()
  }, [product_url, type_product])

  // Filter products based on search input

  // useEffect(() => {
  //   const filteredProducts = products.filter((product) => {
  //     return (
  //       product.title.toLowerCase().includes(searchInput.toLowerCase()) ||
  //       product.description.toLowerCase().includes(searchInput.toLowerCase())
  //     )
  //   })
  //   setFilteredProducts(filteredProducts)
  // }, [products, searchInput])

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      return (
        product.title.toLowerCase().includes(inputValue.toLowerCase()) ||
        product.description.toLowerCase().includes(inputValue.toLowerCase())
      )
    })
    setFilteredProducts(filteredProducts)
  }, [products, inputValue])

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Dresses</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select>
            <Option disabled selected>
              Color
            </Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select>
            <Option disabled selected>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select>
            <Option selected>Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <SearchContainer>
        <Stack spacing={2} sx={{ width: 300 }}>
          <Autocomplete
            freeSolo
            id='free-solo-2-demo'
            disableClearable
            options={filteredProducts.map((option) => option.title)}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Search input'
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                  // onChange: (e) => setSearchInput(e.target.value),
                }}
              />
            )}
          />
        </Stack>
      </SearchContainer>
      <Products products={filteredProducts} />
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default ProductList
