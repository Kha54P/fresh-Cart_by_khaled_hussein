import React from 'react'
import Slide3 from '../../Assets/images/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg'
import sidImg1 from '../../Assets/images/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg'
import sidImg2 from '../../Assets/images/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg'
import Slide2 from '../../Assets/images/41nN4nvKaAL._AC_SY200_.jpg'
import Slide1 from '../../Assets/images/61cSNgtEISL._AC_SY200_.jpg'
import Slider from 'react-slick'
export default function MainSlidar() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  }
  return <>
  <div className="row w-50 mx-auto py-4 gx-0">
  <div className="col-md-8 cursor-grap">
  <Slider {...settings}>
      <img src={Slide1} height={400} className=' w-100' alt="ay7age" />
      <img src={Slide2} height={400} className=' w-100' alt="ay7age" />
      <img src={Slide3} height={400} className=' w-100' alt="ay7age" />
    </Slider>
  </div>
  <div className="col-md-4 cursor-grap">
    <img src={sidImg1} className=' w-100' height={200} alt="ay7hage" />
    <img src={sidImg2} className=' w-100' height={200} alt="ay7hage" />
  </div>
  </div>

  </>
}
