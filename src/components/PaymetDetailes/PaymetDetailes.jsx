import React, { useContext, useState } from 'react'
import style from './PaymetDetailes.module.css'
import { useFormik } from 'formik'
import { CartCountext } from '../../Context/CartCountext'
import { RotatingLines } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
export default function PaymetDetailes() {
  let [loading ,setLoading] = useState(false)
  let {pay}=useContext(CartCountext)
  let {id}=useParams();
  // console.log(id);
async function handelPaymentDetalis(values) {
  setLoading(true)
  let { data } = await pay(values,id);
  console.log(data);
  setLoading(false)
  if (data && data.status === "success") {
    window.location.href = data.session.url;
  }
}

  let formik = useFormik({
    initialValues:{
      details: "",
      phone: "",
      city: "",
    },
    onSubmit:handelPaymentDetalis,

  })
  return <>
  
  <Helmet>
                <title>Check-Out Component</title>
            </Helmet>
  {loading?  
  <div className="bg-loading position-fixed top-0 end-0 start-0 bottom-0 d-flex justify-content-center align-items-center">
  <RotatingLines strokeColor="#fff" strokeWidth="5" animationDuration="0.75" width="96" visible={true} />
</div>
  :''}
    <form className=' w-75 mx-auto my-5' onSubmit={formik.handleSubmit}>
      <label htmlFor="Details">Details</label>
      <input className=' form-control my-2 p-2' type="text" 
      name='details' 
      value={formik.values.details}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      />

<label htmlFor="Phone">Phone</label>
      <input className=' form-control my-2 p-2'
       type="tel" 
      name='phone'
      value={formik.values.phone}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      />

<label htmlFor="City">City</label>
      <input className=' form-control my-2 p-2' type="text" 
      name='city'
      value={formik.values.city}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      />

      <button type='submit' className='btn btn-outline-info   my-5 w-100'>Pay Online</button>
    </form>
  </>
}
