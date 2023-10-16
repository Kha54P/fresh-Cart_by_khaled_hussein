import React, { useEffect, useState } from 'react';
import style from './Allorders.module.css';
import axios from 'axios';

export default function Allorders() {
  const [allOrders, setAllOrders] = useState([]);

  async function getAllOrders() {
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${localStorage.getItem('userId')}`);
      setAllOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="container py-5">
      <h1>All Orders</h1>
      <div className="row">

      {allOrders &&
        allOrders.map((order) =>
          order.cartItems.map((cartItem, index) => {
            const product = cartItem.product;
            return (
              product && (
                <div key={index} className="col-md-2 ">
                  <div className="prod p-3">
                    <img src={product.imageCover} className="w-100 rounded-4" alt="" />
                    <span className=' text-muted'>{product.title.split(" ").splice(0, 2).join(" ")}</span>
                    <p className=' text-main'>done</p>
                  </div>
              
                </div>
              )
            );
          })
        )}
    </div>
    </div>

  );
}