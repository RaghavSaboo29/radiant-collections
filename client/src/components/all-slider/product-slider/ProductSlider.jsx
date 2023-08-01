import React, { useEffect, useState } from 'react'
// import './ProductSlider.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import axios from 'axios'
import ProductSliderCard from '../../card/ProductSliderCard'
import { Link } from 'react-router-dom'

const ProductSlider = () => {
  const [trendingProduct, setTrendingProduct] = useState([])

  const getTrendingProduct = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:8080/api/v1/product/get-trending'
      )
      if (data?.success) {
        setTrendingProduct(data.products)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getTrendingProduct()
  }, [])

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    className: 'center',
    // swipeToSlide: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  }
  return (
    <>
      <div className="product-slider">
        <Link to={`/trending`} style={{ textDecoration: 'none' }}>
          <h3 className="tp-heading">Trendy Products</h3>
        </Link>
        <Slider {...settings}>
          {trendingProduct.slice(0, 7).map((tp) => (
            <Link
              to={`/trending/${tp._id}`}
              key={tp._id}
              style={{ textDecoration: 'none' }}
            >
              <ProductSliderCard {...tp} />
            </Link>
          ))}
          <div className="card card-button">
            <Link to={`/trending`}>
              <button className="btn">Explore More</button>
            </Link>
          </div>
        </Slider>
      </div>
    </>
  )
}

export default ProductSlider
