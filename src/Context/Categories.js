import axios from "axios";
import { createContext } from "react";


export let CategoriesCountext = createContext();

export default function createContextProvider({children}){
        
    let headers = {token:localStorage.getItem('userToken')}
    function getCategories(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories',{
                headers:headers
        }).then((response)=>response)
        .catch((error)=>error)
    }
    return <CategoriesCountext.Provider value={{getCategories}}>
        {children}
    </CategoriesCountext.Provider>
}