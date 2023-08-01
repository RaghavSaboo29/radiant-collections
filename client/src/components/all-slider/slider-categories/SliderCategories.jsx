import React, { useEffect, useState } from 'react'
import './SliderCategories.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import axios from 'axios'

import crockery from '../../../images/category-slider/crockery.jpg'
import wallhangings from '../../../images/category-slider/walldecor.jpeg'
import organizers from '../../../images/category-slider/organizer.jpg'
import showpieces from '../../../images/category-slider/showpiece.jpg'
import bedsheets from '../../../images/category-slider/bedsheet.jpg'
import cushions from '../../../images/category-slider/cushion.jpg'
import womenkurta from '../../../images/category-slider/womenkurta.jpg'
import saree from '../../../images/category-slider/saree.jpg'
import kitchenware from '../../../images/category-slider/kitchenware.jpg'

import { Link } from 'react-router-dom'

const SliderCategories = () => {
  const images = [
    wallhangings,
    organizers,
    showpieces,
    bedsheets,
    cushions,
    womenkurta,
    saree,
    crockery,
    kitchenware,
  ]

  const [category, setCategories] = useState([])

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        // 'http://localhost:8080/api/v1/category/get-category'
        'https://radiant-collections-and-decor.onrender.com/api/v1/category/get-category'
      )
      if (data?.success) {
        setCategories(data?.category)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllCategory()
  }, [])

  const settings = {
    className: 'center',
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 6,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          infinite: true,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 4,
          infinite: true,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 3,
          infinite: true,
          swipeToSlide: true,
        },
      },
    ],
  }
  return (
    <>
      <div className="slider-container">
        <Link to={`/category`} style={{ textDecoration: 'none' }}>
          <h2 className="categories">Explore Various Categories</h2>
        </Link>
        <Slider {...settings}>
          {category.map((c, index) => (
            <React.Fragment key={c._id}>
              <div className="slider-card">
                <Link
                  to={`/category/${c.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className="slider-img">
                    <img src={images[index]} alt="category-image" />
                  </div>
                  <h3>{c.name}</h3>
                </Link>
              </div>
            </React.Fragment>
          ))}
        </Slider>
      </div>
    </>
  )
}

export default SliderCategories
