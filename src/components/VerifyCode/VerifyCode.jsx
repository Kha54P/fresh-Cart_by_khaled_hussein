import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';

export default function VerifyCode() {
  let [loading,setLoading]=useState(false)
  let navigate = useNavigate();

  const validationSchema = yup.object({
    resetCode: yup.string().required('Code is required'),
  });

  async function handleForgetPassword(values) {
    setLoading(true)
    let { data } = await axios.post(
      'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
      values
    )
    .catch((err)=>err)
   setLoading(false)
    if (data.status === 'Success') {
      toast.success(data.status);
      navigate('/restPassword');
    } else {
      toast.error(data.status);
    }
  }

  let formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    onSubmit: handleForgetPassword,
      validationSchema,
  });

  return (
    <>
      <Helmet>
        <title>Verify-Code</title>
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
        <h1 className="fw-bolder mb-3">Please enter your verification resetCode</h1>
        <form onSubmit={formik.handleSubmit}>
          <FloatingLabel controlId="floatingInput" label="Code" className="mb-3">
            <Form.Control
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.resetCode}
              name="resetCode"
            />
          </FloatingLabel>
          {formik.errors.resetCode && formik.touched.resetCode && (
            <div className="alert alert-danger">{formik.errors.resetCode}</div>
          )}

          <button
            disabled={!formik.isValid || !formik.dirty}
            type="submit"
            className={`btn btn-lg ms-auto border-1 border-black ${
              formik.isValid && formik.dirty ? 'bg-main text-white border-0' : ''
            }`}
          >
            Reset Code
          </button>
        </form>
      </div>
    </>
  );
}