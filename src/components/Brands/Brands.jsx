import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import style from './Brands.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import { RotatingLines } from 'react-loader-spinner'
import { Helmet } from 'react-helmet';
export default function Brands() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let [brand , setBrand]=useState([])
  let [Loading , setLoading]=useState(false)
  function getAllBrands(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
  let {data , isLoading} = useQuery('allCat',getAllBrands)
// console.log(data?.data.data);
async function getSpacifcBrands(id){
  setLoading(true)
  let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
  setBrand(data?.data)
  setLoading(false)
  // console.log(brand.slug);
}
  return<>
  
  <Helmet>
                <title>Brands Component</title>
            </Helmet>
  {Loading?<div className="bg-loading  position-fixed top-0 end-0 start-0 bottom-0 d-flex justify-content-center align-items-center">
          <RotatingLines
          strokeColor="#fff"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
          </div>:''}
  <h1 className=' text-main text-center'>All Brands</h1>
    {isLoading? <div className="bg-loading position-fixed top-0 end-0 start-0 bottom-0 d-flex justify-content-center align-items-center">
          <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
          </div>:  <div className="row ">
      {data?.data.data.map((cat)=>
      (  <div onClick={()=>getSpacifcBrands(cat._id)}  className="col-md-3 p-3 ">
          <div className="">
          <div  onClick={handleShow} class="card cursor-pointer" >
          <img src={cat.image} className=' w-100 '  alt={cat.name} />
        <div class="card-body text-center">
          <p class="card-text">{cat.name}</p>
        </div>
        </div>
          </div>
        </div>
      ))}
  </div>}
  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>
          <div className=" container">
          <div className="row">
            <div className="col-md-6">
                <h1 className=' text-main'>{brand.name}</h1>
                <p >{brand.slug}</p>
            </div>
            <div className="col-md-6">
              <img src={brand.image} className=' w-100' alt={brand.name} />
            </div>
          </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
      
        </Modal.Footer>
      </Modal>
  </>

}


