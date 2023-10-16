import React, { useContext, useEffect } from 'react'
import style from './WishList.module.css'
import { WishListContext } from '../../Context/WishListCountext'
import { Helmet } from 'react-helmet'
import { useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import Slider from 'react-slick'
import { CartCountext } from '../../Context/CartCountext'
import toast from 'react-hot-toast'
export default function WishList() {
  let [loading ,setLoading]= useState(false)
  let [getWish , setGetWish]=useState([])
  let {addToCart , setNumCart}=useContext(CartCountext)
   let {getLoggedUserWishlist , removeProductFromWishlist ,setWishlist} = useContext(WishListContext)
   async function getWishList(){
    setLoading(true)
    let {data}=await getLoggedUserWishlist()
   await setGetWish(data?.data)
    console.log(getWish);

    setLoading(false)
   }
   async function addProduct(id){
    // setLoading(true)
      let {data}=await addToCart(id)
      await getWishList()
      // setLoading(false)
      console.log(data);
      if(data.status === "success"){
        toast.success(data?.message)
      }else{
        toast.error(data?.message)
      }
      setNumCart(data.numOfCartItems);

  }
   async function removeProdect(id){
    setLoading(true)
    let {data} = removeProductFromWishlist(id)
     await getWishList()
     console.log(data);
    setLoading(false)
   }
   useEffect(()=>{
    getWishList()
   },[])
  return<>
      <Helmet>
        <title>WishList Component</title>
      </Helmet>
      {loading?(
              <div className="bg-loading position-fixed top-0 end-0 start-0 bottom-0 d-flex justify-content-center align-items-center">
                <RotatingLines strokeColor="#fff" strokeWidth="5" animationDuration="0.75" width="96" visible={true} />
              </div>
          ):''}
      <div className="margin p-3 bg-main-light my-5">
        <div className="my-3 ">
            <h2 className=' fw-bolder'>My wish List</h2>
            {getWish? getWish?.map((data)=>(
            <div key={data._id}  className="row border-bottom my-3 d-flex align-items-center p-2 ">
                <div className="col-md-2 p-3">
            
                      <img src={data?.imageCover} className=' w-100' alt={data?.title} />
                
                </div>
                <div className="col-md-10">
                  <div className="d-flex justify-content-between">
                    <div className=' w-75'>
                      <h5 className='fw-bolder text-start'>{data.title}</h5>
                      <h6 className=' text-main fw-bolder text-start'>{data.price} EGP</h6>
                      <button onClick={()=>removeProdect(data?._id)} className='btn btn-sm m-0 p-0 text-danger '><i className='fa fa-trash me-1'></i>Remove</button>
                    </div>
                    <div>
                    <button onClick={()=>{
                      addProduct(data?.id)
                      removeProdect(data?._id)
                      }} className=' btn  border-1 border-success p-2   '> add to cart</button>
                  </div>
                  </div>
  
                </div>
                
              </div>
            )):''}
          </div>
          </div>
  </>
}
