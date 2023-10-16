import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetailes.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query';
import { RotatingLines } from 'react-loader-spinner';
import { CartCountext } from '../../Context/CartCountext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListCountext';
export default function ProductDetailes() {
  let [loading ,setLoading]= useState(false)
  let {addToCart,setNumCart}=useContext(CartCountext);
  let {id} =useParams();
  let { addProductToWishlist, wishlist, setWishlist } =
  useContext(WishListContext);
  
  async function addWishList(id) {
    setLoading(true);
    let { data } = await addProductToWishlist(id);
    setWishlist(data?.data);
    setLoading(false);
    if (data?.status === "success") {
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
  }

   function getProductDetailes(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
      let {data } = useQuery('productDetails',()=>getProductDetailes(id))
      let finalData = data?.data.data
      console.log(finalData);
      async function addProduct(id){
        setLoading(true)
          let {data}=await addToCart(id)
          console.log(data);
          setLoading(false)
          if(data.status === "success"){
            toast.success(data.message)
          }else{
            toast.error(data.message)
          }
          setNumCart(data.numOfCartItems);
    
      }
  return<>
        {loading? 
          <div className="bg-loading  position-fixed top-0 end-0 start-0 bottom-0 d-flex justify-content-center align-items-center">
          <RotatingLines
          strokeColor="#fff"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
          </div>
        :''}
      {finalData?  <>
          <div className="row align-items-center p-3">
            <div className="col-md-4 p-2">
              <img src={finalData.imageCover} className=' w-100' alt={finalData.title} />
            </div>
            <div className="col-md-8">
              <h2 className=' fw-bold'>{finalData.title}</h2>
              <p>{finalData.description}</p>
              <div className="d-flex justify-content-between align-items-center">
                <span>{finalData.price} EGP</span>
                <span><i className=' fas fa-star rating-color'></i>{finalData.ratingsAverage}</span>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button onClick={()=>addProduct(finalData._id)} className="w-75 mx-auto btn d-block bg-main text-white"> +add </button>
                <i
                        onClick={() => addWishList(finalData?._id)}
                        className={`fa-solid fa-heart h3 ${
                          wishlist?.includes(finalData?._id) ? "text-danger" : ""
                        }`}
                      ></i>
              </div>
            </div>
          </div>
      </>  : <div className=" bg-loading position-fixed top-0 end-0 start-0 bottom-0 d-flex justify-content-center align-items-center">
          <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
          </div>}
  </>
}
