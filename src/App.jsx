import React from 'react'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import WishList from './components/WishList/WishList'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Products from './components/Products/Products'
import Notfound from './components/Notfound/Notfound'
import PaymetDetailes from './components/PaymetDetailes/PaymetDetailes'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import  { Toaster } from 'react-hot-toast';
import UserContextProvider from './Context/UserContext'
import ProtectedRout from './components/ProtectedRout/ProtectedRout'
import ProductDetailes from './components/ProductDetailes/ProductDetailes'
import CartCountextProvider from './Context/CartCountext'
import Allorders from './components/Allorders/Allorders'
import WishListContextProvider from './Context/WishListCountext'
import VerifyCode from './components/VerifyCode/VerifyCode'
import RestPassword from './components/RestPassword/RestPassword'

let routs =createBrowserRouter([
  {path:'' ,element:<Layout/>, children:[
    {index:true ,element: <ProtectedRout><Home/></ProtectedRout> },
    {path:'/cart' , element:<ProtectedRout><Cart/></ProtectedRout>},
    {path:'/wishlist' , element:<ProtectedRout><WishList/></ProtectedRout>},
    {path:'/categories' , element:<ProtectedRout><Categories/></ProtectedRout>},
    {path:'/products' , element:<ProtectedRout><Products/></ProtectedRout>},
    {path:'paymetdetailes/:id',element:<ProtectedRout><PaymetDetailes/></ProtectedRout>},
    {path:'allorders',element:<ProtectedRout><Allorders/></ProtectedRout>},
    {path:'/brands' , element:<ProtectedRout><Brands/></ProtectedRout>},
    {path:'/productdetailes/:id' , element:<ProtectedRout><ProductDetailes/></ProtectedRout>},
    {path:'/login' , element:<Login/>},
    {path:'/register' , element:<Register/>},
    {path:'forgetpassword' , element:<ForgetPassword/>},
    {path:'verify-code' , element:<VerifyCode/>},
    {path:'restPassword' , element:<RestPassword/>},
  ]},

    {path:'*',element:<Notfound/>},
  

])


export default function App() {
  return<>

  <WishListContextProvider>
  <UserContextProvider>
  <CartCountextProvider>
  <RouterProvider router={routs}></RouterProvider>
  <Toaster/>
  </CartCountextProvider>
  </UserContextProvider>
  </WishListContextProvider>
  </>
}
