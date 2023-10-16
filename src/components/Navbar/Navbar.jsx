import React, { useContext, useEffect, useState } from 'react'
import style from './Navbar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { CartCountext } from '../../Context/CartCountext'
import { useQuery } from 'react-query'
export default function Navbar() {
  let [product ,setProduct]=useState([])
  let {getLoggedUserCart}=useContext(CartCountext)

  // let {data} = useQuery('numOfCart',getLoggedUserCart)
  // console.log(data.data.numOfCartItems);
    let {numCart}=useContext(CartCountext)
  let {token ,setToken} = useContext(UserContext)
  let navigate = useNavigate()
  function logout(){
    localStorage.removeItem('userToken')
    setToken(null)
    navigate('/login')
  }
  return<>
  <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
  <div className="container">
    <Link className="navbar-brand" to=""><i className="fa-solid fa-cart-shopping text-main fs-3 me-1"></i><span className='h3 fw-bold'>fresh cart</span></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
        {token !==null? <>
          <li className="nav-item">
          <NavLink className="nav-link" to="">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="cart">Cart</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="wishlist">Wish List</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="products">Product</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="categories">Categorie</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="brands">Brand</NavLink>
        </li>
      </>:''}

      </ul>

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {token !==null?<>
          <li className="nav-item">
          <Link className="nav-link position-relative" to="cart">
            <i className="fa-solid fa-cart-shopping fs-3"></i>
            <div className='badge position-absolute text-white top-0 end-0 bg-main'><span>{numCart> 0 ? numCart : 0}</span></div>
            </Link>
        </li>
        <li className="nav-item">
          <NavLink onClick={()=> logout()} className="nav-link" to="#">logout</NavLink>
        </li>
        </>:<>
        <li className="nav-item">
          <NavLink className="nav-link" to="login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="register">register</NavLink>
        </li>

        </>}



      </ul>
    </div>
  </div>
</nav>
  </>
}
