import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import * as yup from 'yup'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";


export default function Login() {
     let {setToken} =useContext(UserContext)
  let [isLoading ,setLoading] = useState(false)
  let [error,setError] = useState(null)
 const validationSchema = yup.object({
    email:yup.string().email('Email is not valid').required('Email is required'),
    password:yup.string()
      .matches(/^[A-z][a-z0-9]{5,20}/, "password is not valid")
      .required("password is required"),
 
  })
  let navigate = useNavigate()
  async function sendData(value){
    setLoading(true)
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',value)
    .catch((err) => {
      setError(err.response.data.message);
      setLoading(false);
    });
    console.log(data);
    if (data.message === "success") {
      setLoading(false);
      localStorage.setItem('userToken',data.token)
      setToken(data.token)
      navigate("/");
    }
    
    console.log(data);
  }
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit:sendData,
    validationSchema:validationSchema
  });
  return (
    <>
            
            <Helmet>
                <title>Sign-in Component</title>
            </Helmet>
      <div className="Login  py-5">
        
        <div className="title position-relative">

          <h2 className=" fw-bolder">login now </h2>
            {error ? <div className="alert alert-danger mt-5">{error}</div> : ""}

            <form onSubmit={formik.handleSubmit}>
            <label htmlFor="useremail">Email :</label>
            <input
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              type="email"
              placeholder="useremail..."
              id="userEmail"
              className=" form-control py-2 my-2"
            />
            {formik.errors.email && formik.touched.email ?  <p className=" my-2 text-danger fw-bolder">{formik.errors.email}</p> : ''}

            <label htmlFor="password">Password :</label>
            <input
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              type="password"
              placeholder="password..."
              id="password"
              className=" form-control py-2 my-2"
            />
            {formik.errors.password && formik.touched.password ?  <p className=" my-2 text-danger fw-bolder">{formik.errors.password}</p> : ''}

            <div className="d-flex justify-content-between align-items-center">
            <Link to='/forgetpassword' className="h5 forget">forget your password ?</Link>
            <button
                disabled={!formik.isValid || !formik.dirty }
                type="submit"
                className={`btn btn-lg ms-auto border-1 border-black ${formik.isValid && formik.dirty ? 'bg-main text-white border-0 ' : ''}`}
              >
                {isLoading?<div className="d-flex justify-content-center align-items-center">
            <RotatingLines
              strokeColor="#fff"
              strokeWidth="5"
              animationDuration="0.75"
              width="30"
              visible={true}
            />
            </div> :'Login Now'}
            </button>
            
            </div>


          </form>
        </div>
      </div>
    </>
  );
}
