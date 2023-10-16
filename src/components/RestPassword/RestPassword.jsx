import React, { useContext, useState } from "react";
import style from "./RestPassword.module.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as yup from 'yup'
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { UserContext } from "../../Context/UserContext";
export default function RestPassword() {
  let {setToken}=useContext(UserContext)
  let [loading ,setLoading]=useState(false)

  let navigate = useNavigate()
  const validationSchema = yup.object({
    email:yup.string().email('Email is not valid').required('Email is required'),
    newPassword:yup.string()
      .matches(/^[A-z][a-z0-9]{5,20}/, "password is not valid")
      .required("password is required"),
  })
  async function handelNewPassword(values) {
    setLoading(true)
    let {data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values)
    .catch(err=>{
      toast.error(err.response.data.message)
      setLoading(false)
    })
    .then(res=>{
      setToken(localStorage.setItem('userToken',res.data.token))
      toast.success(`The password has been changed successfully`)
      navigate('/')
    })
    setLoading(false)
    // console.log(data);
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: handelNewPassword,
    validationSchema,
  });
  return (
    <>
         {loading?    <div className="bg-loading  position-fixed top-0 end-0 start-0 bottom-0 d-flex justify-content-center align-items-center">
          <RotatingLines
          strokeColor="#fff"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
          </div>:''}
    <div className="container pt-4 ">
      <div className="bg-light p-5">
      <h1>Reset Password</h1>
      <form onSubmit={formik.handleSubmit}>
        <FloatingLabel
          controlId="floatingInput"
          label="Email "
          className="mb-3"
        >
          <Form.Control
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            name="email"
            type="email"
            placeholder="name@example.com"
          />
          {formik.errors.email && formik.touched.email ?  <p className=" my-2 text-danger fw-bolder">{formik.errors.email}</p> : ''}

        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="newPassword">
          <Form.Control
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
            name="newPassword"
            type="password"
            placeholder="Password"
          />
        </FloatingLabel>
        {formik.errors.newPassword && formik.touched.newPassword ?  <p className=" my-2 text-danger fw-bolder">{formik.errors.newPassword}</p> : ''}

        <button
          disabled={!formik.isValid || !formik.dirty}
          type="submit"
          className={`btn btn-lg ms-auto border-1 my-3 border-black ${
            formik.isValid && formik.dirty ? "bg-main text-white border-0 " : ""
          }`}
        >rest password</button>
      </form>
      </div>
      </div>
    </>
  );
}
