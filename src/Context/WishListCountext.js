import axios from "axios";

const { createContext, useState } = require("react");

export let WishListContext=createContext()

export default function WishListContextProvider(props){
    let [wishlist ,setWishlist]=useState(null)

    let headers ={ token:localStorage.getItem('userToken')}

    function addProductToWishlist(id){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
            productId:id
        },
      
        {
            headers
        }
      
        )
        .then(res=>res)
        .catch(err=>err)
    }

    function getLoggedUserWishlist(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,

        {
            headers
        }
      
        )
        .then(res=>res)
        .catch(err=>err)
    }

    function removeProductFromWishlist(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,

        {
            headers
        }
      
        )
        .then(res=>res)
        .catch(err=>err)
    }

    
    return <WishListContext.Provider value={{wishlist ,setWishlist,addProductToWishlist ,getLoggedUserWishlist , removeProductFromWishlist}}>
        {props.children}
    </WishListContext.Provider>
}
