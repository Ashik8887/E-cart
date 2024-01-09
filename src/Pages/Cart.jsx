import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { decQuantity, emptyCart, incQuantity, removeCart } from '../Redux/Slices/cartSlice'
import Header from '../Components/Header'



function Cart() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector(state=>state.cartReducer)
  const [cartAmount,setCartAmount] = useState(0)
  
  useEffect(()=>{
    if (cart?.length>0){
      setCartAmount(cart?.map(products=>products?.totalprice).reduce((p1,p2)=>p1+p2))
    }else{
      setCartAmount(0)
    }
  },[cart])
  const handleCheckout =()=>{
    alert("Your order has successfully placed... Thank you for purchasing with us!!!")
    dispatch(emptyCart())
    navigate('/')
  }
   const handleDecrementCart=(products)=>{
     if(products.quantity==1){
       dispatch(removeCart(products.id))
      }
      else{
       dispatch(decQuantity(products))
     }
   }

  return (
   <>
   <Header/>
      <div className='container mt-5'>
       
        { cart?.length>0?  <div className="row mt-5">
          <div className="col-lg-8">
            <h3 className='mt-5'>Cart Summary</h3>
          <Table className='shadow'>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Image </th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { cart?.map((products,index)=>(
                 <tr key={index}>
                 <td>{index+1}</td>
                 <td>{products.title}</td>
                 <td><img style={{height:'60px',width:'60px'}} src={products.thumbnail} /></td>
                 <td>
                  <div className='d-flex'>
                    <button onClick={()=>(handleDecrementCart(products))} className='btn fw-bolder'>-</button>

                    <input style={{width:'50px'}} className='form-control' type="text" value={products.quantity} readOnly />
                    <button onClick={()=>dispatch(incQuantity(products))} className='btn fw-bolder'>+</button>
                    </div>
                    </td>
                 <td>$ {products.totalprice}</td>
                 <td><button onClick={()=>dispatch(removeCart(products.id))} className='btn'><i className="fa-solid fa-trash text-danger"></i></button></td>
               </tr>
  
              ))
               }
            </tbody>
          </Table>
          <div className='float-end'>
            <button onClick={()=>dispatch(emptyCart())} className='btn btn-danger me-3'>Empty Cart</button>
            <Link to={'/'} className='btn btn-primary'>Shop More</Link>
          </div>
          </div>
          <div className="col-lg-4 mt-5">
            <div className="d-flex flex-column border rounded shadow p-4">
              <h5>Total Product: <span className='fw-bolder'>{cart?.length}</span></h5>
              <h3>Total Amount: <span className='fw-bolder text-danger'>$ {cartAmount}</span></h3>
              <hr />
              <div className="d-grid">
                <button onClick={handleCheckout} className='btn btn-success'>CheckOut</button>
              </div>
            </div>
          </div>
        </div>:
        <div className='text-center mt-5'>
          <img width={'25%'} height={'200px'} src="https://ariadrivingschool.com/wp-content/uploads/2020/02/red-shopping-basket-icon-hd-png-download-removebg-preview.png" alt="" />
          <h1 className='mt-3'>Your Cart is Empty</h1>
          <Link to={'/'} className='btn btn-success'>Click here to shop more!!!</Link>
  
        </div>
        }
  
      </div>
   </>
  )
}

export default Cart