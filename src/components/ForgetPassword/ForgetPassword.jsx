import React, { useState } from 'react'
import style from './ForgetPassword.module.css'
import { Helmet } from 'react-helmet'
import { FloatingLabel, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import axios from 'axios'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { Navigate, useNavigate } from 'react-router-dom'
import { RotatingLines } from 'react-loader-spinner'
export default function ForgetPassword() {
  let [loading,setLoading]=useState(false)
  let navigate=useNavigate()
  const validationSchema =yup.object({
    email:yup.string().required('Email is required').email('Email is not valid')
  })
 async function handelForgetPassword(values){
      setLoading(true)
    let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values)
    console.log(data);
    if(data.statusMsg === "success"){
      toast.success(data.message)
      navigate('/verify-code')
    }else{
      toast.error(data.message)
      setLoading(false)
      
    }
    setLoading(false)
  }
  let formik=useFormik({
    initialValues:{
      email:''
    },
    onSubmit:handelForgetPassword,
    validationSchema,
  })
  return<>
  <Helmet>
    <title>Froget-password Component</title>
  </Helmet>
  {loading?    <div className="bg-loading  position-fixed top-0 end-0 start-0 bottom-0 d-flex justify-content-center align-items-center">
          <RotatingLines
          strokeColor="#fff"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
          </div>:''}
  <div className="container py-5">
    <h1 className=' fw-bolder mb-3'>please enter your email </h1>
    <form onSubmit={formik.handleSubmit}  >
    <FloatingLabel
        controlId="floatingInput"
        label="Email "
        className="mb-3"
      >
        <Form.Control
         type="email"
         onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        name='email'
        placeholder="name@example.com" />
      </FloatingLabel>
      {formik.errors.email && formik.touched.email ?  <div className=" alert alert-danger">{formik.errors.email}</div> : ''}

      <button 
        disabled={!formik.isValid || !formik.dirty }
        type="submit"
        className={`btn btn-lg ms-auto border-1 border-black ${formik.isValid && formik.dirty ? 'bg-main text-white border-0 ' : ''}`}
      >Verify</button>
    </form>
  </div>
  </>
}
