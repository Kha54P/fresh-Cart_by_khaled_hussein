import React, { useContext, useEffect, useState } from 'react';
import style from './Cart.module.css';
import { CartCountext } from '../../Context/CartCountext';
import { Link, useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import { WishListContext } from '../../Context/WishListCountext';


export default function Cart() {
  let naviget = useNavigate()
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
 
  const {getLoggedUserCart, removeItem, updateCartCount ,clearUserUart,setNumCart} = useContext(CartCountext);


  async function cartDetails() {
    setLoading(true);
    const { data } = await getLoggedUserCart();
    setProduct(data);
    // setNumCart(data.)
    setNumCart(data?.numOfCartItems);
    localStorage.setItem('userId',data?.data.cartOwner);
    setLoading(false);
    
  }

  async function removeProduct(id) {
    await removeItem(id);
    await cartDetails();
  }

  async function updateCount(id, count) {
    await updateCartCount(id, count);
    await cartDetails();
  }

  async function clearCart(){
    let {data}= await clearUserUart()
    await cartDetails()
    naviget('/')
    console.log(data);
  }

  useEffect(() => {
    cartDetails();
  }, []);

  return (
    <>
  
      <Helmet>
        <title>Cart Component</title>
      </Helmet>
      <div className="margin p-3 bg-main-light my-5">
        <div className="my-3 d-flex justify-content-between align-items-center">
          <h3 className="fw-bolder">Cart Shop</h3>
          <Link to={`/paymetdetailes/${product?.data._id}`} className="btn bg-primary text-white mt-3">
            Checkout
          </Link>
        </div>
        {product ? (
          <>
          
            <div className="my-3 d-flex justify-content-between align-items-center">
              <h5 className="fw-bolder">
                Total price: <span className="text-main fw-bolder">{product?.data.totalCartPrice > 0 ? product.data.totalCartPrice : 0}</span>
              </h5>
              <h5 className="fw-bolder">
                Total number of items: <span className="text-main fw-bolder">{product?.numOfCartItems > 0 ? product.numOfCartItems : 0}</span>
              </h5>
            </div>
            {loading ? (
              <div className="bg-loading position-fixed top-0 end-0 start-0 bottom-0 d-flex justify-content-center align-items-center">
                <RotatingLines strokeColor="#fff" strokeWidth="5" animationDuration="0.75" width="96" visible={true} />
              </div>
            ) : (
              product.data.products.map((product) => (
                <>
                <div key={product.product.id} className="row border-bottom my-2">
                  <div className="col-md-1 my-2">
                    <img src={product.product.imageCover} className="w-100" alt="" />
                  </div>
                  <div className="col-md-11">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h3 className="h6">{product.product.title.split(' ').splice(0, 3).join(' ')}</h3>
                        <h6 className="text-main">Price: {product.price} EGP</h6>
                      </div>
                      <div>
                        <button onClick={() => updateCount(product.product.id, product.count + 1)} className="btn btn-up btn-border p-1">
                          +
                        </button>
                        <span className="mx-2">{product.count}</span>
                        <button onClick={() => updateCount(product.product.id, product.count - 1)} className="btn btn-up btn-border p-1">
                          -
                        </button>
                      </div>
                    </div>
                    <button onClick={() => removeProduct(product.product.id)} className="btn p-0 border-0">
                      <i className="text-danger font-sm fas fa-trash-can"></i> Remove
                    </button>
                  </div>
                </div>
                </>
              ))
              )
            }
           <div className=" d-flex justify-content-center align-items-center">

            <button onClick={()=>{clearCart()}} className='btn w-25 p-2  btn-outline-success'>Clear user cart</button>
           </div>
          </>
        ) : (
          <h1>Your cart is empty</h1>
        )}
      </div>
    </>
  );
}