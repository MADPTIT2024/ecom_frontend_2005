import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Box, Typography, TextField, Rating, Button } from '@mui/material'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import { mobile } from '../responsive'
import { Add, Remove } from '@mui/icons-material'
import { useLocation } from 'react-router-dom'
import { get_product_type } from '../data'
import { useCart } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'

const Container = styled.div``

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: '10px', flexDirection: 'column' })}
`

const ImgContainer = styled.div`
  flex: 1;
`

const Image = styled.img`
  width: 85%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: '40vh' })}
`

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: '10px' })}
`

const Title = styled.h1`
  font-weight: 200;
`

const Desc = styled.p`
  margin: 20px 0px;
`

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: '100%' })}
`

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`

const Comment = styled.div`
  margin: 10px 30px;
`

const Product = () => {
  const [product, setProduct] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [comments, setComments] = useState([])
  const type_product = useLocation().pathname.split('/')[2]
  const id = useLocation().pathname.split('/')[3]
  const product_url = get_product_type(type_product)
  const { cart } = useCart()
  const { user, dispatch } = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:800${product_url}/${type_product}s/${id}`
      )
      console.log(res.data)
      setProduct(res.data)
    }
    fetchData()

    // const fetchComment = async () => {
    //   const res = await axios.get(
    //     `http://localhost:${process.env.REACT_APP_COMMENT}/comments/filter/?type_product=${type_product}&product_id=${id}`
    //   )
    //   setComments(res.data)
    // }
    fetchComments()
  }, [product_url, type_product, id])

  const fetchComments = async () => {
    const res = await axios.get(
      `http://localhost:${process.env.REACT_APP_COMMENT}/comments/filter/?type_product=${type_product}&product_id=${id}`
    )
    setComments(res.data)
  }

  const handleQuantity = (type) => {
    if (type === 'dec') {
      quantity > 1 && setQuantity(quantity - 1)
    } else {
      setQuantity(quantity + 1)
    }
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const handleRatingChange = (newValue) => {
    setRating(newValue)
  }

  const handleSubmitComment = async () => {
    try {
      const res = await axios.post(
        `http://localhost:${process.env.REACT_APP_COMMENT}/comments/`,
        {
          comment,
          star: rating,
          user: user.fullname.fname + ' ' + user.fullname.lname,
          product_id: product.id,
          type_product: type_product,
        }
      )
      console.log(res.data)

      setComment('')
      setRating(0)
      fetchComments()
    } catch (error) {
      console.error('Error submitting comment:', error)
    }
  }

  const handleClick = async () => {
    try {
      const res = await axios.post('http://localhost:8004/add-to-cart/', {
        quantity: quantity,
        product_id: id,
        type_product: type_product,
        cart: cart.cart_id,
      })
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image
            src={
              product.image ||
              'https://images.pexels.com/photos/5499132/pexels-photo-5499132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
          />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.description}</Desc>
          <Price>$ {product.price}</Price>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity('dec')} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity('inc')} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Comment>
        <Box my={2}>
          <Typography variant='h5'>Rate this product:</Typography>
          <Rating
            value={rating}
            onChange={(event, newValue) => handleRatingChange(newValue)}
          />
        </Box>
        <Box my={2}>
          <Typography variant='h5'>Write a comment:</Typography>
          <TextField
            variant='outlined'
            fullWidth
            multiline
            rows={4}
            value={comment}
            onChange={handleCommentChange}
          />
        </Box>
        <Button
          variant='contained'
          color='primary'
          onClick={handleSubmitComment}
        >
          Submit Comment
        </Button>
        <Box my={2}>
          <Typography variant='h5'>Comments:</Typography>
          {comments.map((comment) => (
            <div key={comment.id}>
              <Typography>{comment.comment}</Typography>
              <Rating value={comment.star} readOnly />
            </div>
          ))}
        </Box>
      </Comment>
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default Product
