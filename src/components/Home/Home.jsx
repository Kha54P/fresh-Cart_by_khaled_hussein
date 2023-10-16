import React from 'react'
import style from './Home.module.css'
import {Helmet} from "react-helmet";
import FeaturedProducts from '../FetureProducts/FetureProducts'
import CategoraySlider from '../CatSlider/CatSlider'
import MainSlidar from '../MainSlider/MainSlider'
export default function Home() {
  return<>
            <Helmet>
                <title>Home Component</title>
            </Helmet>

  <MainSlidar/>
  <CategoraySlider/>
  <div className=" container">
  <FeaturedProducts/>

  </div>
  </>
}
