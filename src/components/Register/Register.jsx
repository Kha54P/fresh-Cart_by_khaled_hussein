import React, { useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import * as yup from 'yup'
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { Helmet } from "react-helmet";
export default function Register() {
  let [isLoading ,setLoading] = useState(false)
  let [error,setError] = useState(null)
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

 const validationSchema = yup.object({
    name:yup.string('Must Be String').min(3,'The name must have more than 3 characters').max(15,'The name must have fewer than 15 characters').required('Name is required'),
    email:yup.string().email('Email is not valid').required('Email is required'),
    phone:yup.string().matches(phoneRegExp, 'Phone is not valid').required('Phone is required'),
    password:yup.string()
      .matches(/^[A-z][a-z0-9]{5,20}/, "password is not valid")
      .required("password is required"),
    rePassword:yup.string().oneOf([yup.ref('password')],'Password is not match').required('Re-Password is required')
 
  })
  let navigate = useNavigate()
  async function sendData(value){
    setLoading(true)
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',value)
    .catch((err) => {
      setError(err.response.data.message);
      setLoading(false);
    });
    if (data.message === "success") {
      setLoading(false);
      navigate("/login");
    }
    
  }
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    onSubmit:sendData,
    validationSchema:validationSchema
  });
  return (
    <>
            
            <Helmet>
                <title>Sign-up Component</title>
            </Helmet>
      <div className="register  py-5">
        
        <div className="title position-relative">

          <h2>register now: </h2>
            {error ? <div className="alert alert-danger mt-5">{error}</div> : ""}
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="userName">Name :</label>
            <input
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              type="text"
              placeholder="userName..."
              id="userName"
              className=" form-control py-2 my-2"
            />
            {formik.errors.name && formik.touched.name ?  <p className=" my-2 text-danger fw-bolder">{formik.errors.name}</p> : ''}


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


            <label htmlFor="repassword">Re-Password :</label>
            <input
              name="rePassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
              type="password"
              placeholder="re-password..."
              id="repassword"
              className=" form-control py-2 my-2"
            />
            {formik.errors.rePassword && formik.touched.rePassword ?  <p className=" my-2 text-danger fw-bolder">{formik.errors.rePassword}</p> : ''}


            <label htmlFor="phone">Phone :</label>
            <input
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              type="tel"
              placeholder="phone..."
              id="phone"
              className=" form-control py-2 my-2"
            />
            {formik.errors.phone && formik.touched.phone ?  <p className=" my-2 text-danger fw-bolder">{formik.errors.phone}</p> : ''}
              <div className=" d-flex justify-content-end">
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
            </div> :'Register Now'}
            </button>

              </div>
          </form>
        </div>
      </div>
    </>
  );
}
