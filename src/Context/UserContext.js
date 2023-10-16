import { createContext, useState } from "react";


export let UserContext = createContext()

export default function UserContextProvider(props){
    const [token ,setToken]=useState(localStorage.getItem('userToken'))
    return <UserContext.Provider value={{token,setToken}}>
            {props.children}
    </UserContext.Provider>
}