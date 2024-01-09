import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToWishlist } from '../Redux/Slices/wishlistSlice'
import { addToCart } from '../Redux/Slices/cartSlice'
import Header from '../Components/Header'





function View() {
  const {id} = useParams()
  const {loading,products,error} = useSelector((state)=>state.productSlice)
  const [product,setProduct] = useState({})
  const dispatch = useDispatch()
  const {wishlist} = useSelector(state=>state.wishlistSlice)


  useEffect(()=>{
    // const product = JSON.parse(localStorage.getItem("product"))
    setProduct(products.find(product=>product.id==id))
  },[])
  const handleWishlist = (products)=>{
    const existingProduct = wishlist.find(item=>item.id==products.id)
    if(existingProduct){
      alert("Product already exists!!!")
    }else{
      dispatch(addToWishlist(products))
    }
  }
  console.log(product);
  return (
    <>
    <Header/>
      <div className='mt-5 container'>{
        loading ? <div className='d-flex justify-content-center mt-5'><Spinner className='me-3' animation='border' variant='danger' />Loading...</div>:
  
        <div className="row mt-5 align-items-center">
          <div className="col-md-4">
            <img className='rounded shadow' style={{height:'400px',width:'100%`'}} src={product?.thumbnail} alt="" />
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-6">
              <p>PID: {product?.id}</p>
              <h1>{product?.title}</h1>
              <h5 className='fw-bolder'>$ {product?.price}</h5>
              <p style={{textAlign:'justify'}}><span className='fw-bolder'>Description: </span>{product?.description}</p>
              <div className='d-flex justify-content-between mt-5'>
                  <Button onClick={()=>(handleWishlist(product))} variant="outline-dark" className='btn fs-5'><i className="fa-solid fa-heart text-danger"></i>Wish list</Button>
                  <Button onClick={()=>dispatch(addToCart(product))} variant="outline-dark" className='btn fs-5'><i className="fa-solid fa-cart-plus text-success"></i>Cart</Button>
                  </div>
                  </div>
  
        </div>
        }
      </div>
    </>
  )
}

export default View