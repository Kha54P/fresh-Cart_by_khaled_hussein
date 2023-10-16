import axios from 'axios'
import style from './Categories.module.css'
import { useQuery } from 'react-query'
import { RotatingLines } from 'react-loader-spinner'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Helmet } from 'react-helmet'

function MyVerticallyCenteredModal(props) {
  let sup = props.supcat
  // console.log(sup);
  return (
    <Modal 
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
          {sup.map((iteam)=>(
              <div className="col-md-6 p-2">
                <div className="title card p-2 text-main  ">
                  <p className=' fs-smal fw-bolder'>{iteam.name}</p>
                </div>
            </div>
          ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function Categories(props) {
  const [modalShow, setModalShow] = React.useState(false);


  let [Loading , setLoading]=useState(false)
  let [supCat, setSupCat]=useState([])

  function getAllCategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  let {data ,isLoading}=useQuery('AllCategories',getAllCategories)
  let finalResponse = data?.data.data
  // console.log(finalResponse);

  async function getSpecificCategories(id){
    setLoading(true)
    let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
    await setSupCat(data.data)
    // console.log(supCat);
    setLoading(false)
  }
  
  return<>
  
  <Helmet>
                <title>Categories Component</title>
            </Helmet>
        {isLoading?   <div className="bg-loading  position-fixed top-0 end-0 start-0 bottom-0 d-flex justify-content-center align-items-center">
          <RotatingLines
          strokeColor="#fff"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
          </div> :''}
        <div className="row ">
      {finalResponse?.map((cat)=>
      (  <div key={cat._id}  className="col-md-4 p-3">
          <div onClick={()=>{
            getSpecificCategories(cat._id)
            setModalShow(true)
            }}>
          <div className="card cursor-pointer" >
          <img src={cat.image} className=' img ' height={300} alt={cat.name} />
        <div className="card-body text-center">
          <p className="card-text">{cat.name}</p>
        </div>
        </div>
          </div>
        </div>
      ))}
  </div>
  <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        supcat={supCat}
        finadata={finalResponse}
      />
      {Loading?
       <div className="bg-loading  position-fixed top-0 end-0 start-0 bottom-0 d-flex justify-content-center align-items-center">
       <RotatingLines
       strokeColor="#fff"
       strokeWidth="5"
       animationDuration="0.75"
       width="96"
       visible={true}
     />
       </div>  :''}
  </>
  
}
