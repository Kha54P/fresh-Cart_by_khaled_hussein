import React, { useContext, useEffect, useState } from "react";
import style from "./FetureProducts.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { RotatingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { CartCountext } from "../../Context/CartCountext";
import { WishListContext } from "../../Context/WishListCountext";

export default function FeaturedProducts() {
  let [loading, setLoading] = useState(false);
  let { addToCart, setNumCart } = useContext(CartCountext);
  let { addProductToWishlist, wishlist, setWishlist } =
    useContext(WishListContext);
  let [searchTerm, setSearchTerm] = useState("");

  function getProduct() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let { data, isLoading } = useQuery("FeatureProduct", getProduct);

  async function addProduct(id) {
    setLoading(true);
    let { data } = await addToCart(id);
    setLoading(false);
    if (data.status === "success") {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    setNumCart(data.numOfCartItems);
  }

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

  function search() {
    const filteredProducts = data?.data.data.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(filteredProducts);
  }

  return (
    <>
      {loading ? (
        <div className="bg-loading  position-fixed top-0 end-0 start-0 bottom-0 d-flex justify-content-center align-items-center">
          <RotatingLines
            strokeColor="#fff"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : (
        ""
      )}
      <div className="container py-5">
        <div className="pb-5 w-75 mx-auto">
          <input
            type="search"
            className="form-control"
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="row py-5 col">
          {isLoading ? (
            <div className="bg-loading  position-fixed top-0 end-0 start-0 bottom-0 d-flex justify-content-center align-items-center">
              <RotatingLines
                strokeColor="#fff"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
            </div>
          ) : (
            data?.data.data
              .filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((prod) => (
                <div className="col-md-3 p-2" key={prod._id}>
                  <div className="p-2 cursor-pointer prod">
                    <Link to={`/productdetailes/${prod._id}`}>
                      <div className="img-home overflow-hidden">
                        <img
                          src={prod.imageCover}
                          className="w-100 ro"
                          alt={prod.title}
                        />
                      </div>
                      <p className="text-main">{prod.category.name}</p>
                      <p>{prod.title.split(" ").splice(0, 2).join(" ")}</p>
                      <div className="d-flex justify-content-between">
                        <span>{prod.price}EGP</span>
                        <span>
                          <i className="fas fa-star rating-color"></i>
                          {prod.ratingsAverage}
                        </span>
                      </div>
                    </Link>
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        onClick={() => addProduct(prod._id)}
                        className="btn bg-main w-75 text-white my-2"
                      >
                        +add
                      </button>
                      <i
                        onClick={() => addWishList(prod?._id)}
                        className={`fa-solid fa-heart h3 ${
                          wishlist?.includes(prod?._id) ? "text-danger" : ""
                        }`}
                      ></i>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </>
  );
}