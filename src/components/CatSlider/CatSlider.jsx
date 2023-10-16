import React from 'react';
import style from './CatSlider.module.css';
import Slider from "react-slick";

import axios from 'axios';
import { useQuery } from 'react-query';

export default function CategoraySlider() {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1
  };

  function getCategory() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  let { data, isError, isLoading } = useQuery('slideCategory', getCategory);
  let finalData = data?.data.data;
  console.log(finalData);

  return (
    <>
    
      {finalData ? (
        <div className=" container-fluid">
        <Slider className=' pt-5' {...settings}>
          {finalData.map((cat)=>(<>
            <img key={cat._id} src={cat.image} className=' w-100 cursor-grap' height={200} alt="" />
            <p className=' fw-bold'>{cat.name}</p>
          </>
          ))}
        </Slider>
        </div>
      ) : (
        ''
      )}
    </>
  );
}