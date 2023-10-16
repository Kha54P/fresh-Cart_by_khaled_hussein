import React from 'react'
import style from './Products.module.css'
import FeaturedProducts from '../FetureProducts/FetureProducts'
import { Helmet } from 'react-helmet'

export default function Products() {
  return<>
             <Helmet>
                <title>Products Component</title>
            </Helmet>
  <FeaturedProducts/>
  </>
}
