import axios from "axios";
import { createContext, useState } from "react";

export let CartCountext= createContext()


export default function CartCountextProvider(props){
    let [numCart,setNumCart]=useState([])
  
        let headers ={ token:localStorage.getItem('userToken')}
    function addToCart(id){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
        {productId:id},
        {
            headers
        })
        .then(res=>res)
        .catch(err=>err)
    }
    
    function getLoggedUserCart(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
                headers:headers
        }).then((response)=>response)
        .catch((error)=>error)
    }


    function removeItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers}
       ).then((response)=>response)
       .catch((error)=> error
        )
    }

    function updateCartCount(productId,count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count},{headers}
       ).then((response)=>response)
       .catch((error)=> error
        )
    }


    function pay(shippingAddress,id){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
        {
            shippingAddress
        }
        ,{
            headers
        })
        .then(res=>res)
        .catch(err=>err)
    }


    function clearUserUart() {
        return axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{
            headers:headers
    }).then((response)=>response)
    .catch((error)=>error)
    }


    return <CartCountext.Provider value={{ numCart,setNumCart,pay,addToCart ,getLoggedUserCart ,removeItem,updateCartCount,clearUserUart}}>
        {props.children}
    </CartCountext.Provider>
}