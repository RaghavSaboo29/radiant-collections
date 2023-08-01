import React, { useEffect, useState } from 'react'
import './ProductSlider.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import ProductSliderCard from '../../card/ProductSliderCard'
const AllProductSlider = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:8080/api/v1/product/get-product/product-list/1'
      )
      setProducts(data.products)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllProducts()
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
        <Link to={`/allproducts`} style={{ textDecoration: 'none' }}>
          <h3 className="tp-heading">View All Products</h3>
        </Link>
        <Slider {...settings}>
          {products.slice(0, 7).map((product) => (
            <Link
              to={`/allproducts/${product._id}`}
              style={{ textDecoration: 'none' }}
              key={product._id}
            >
              <ProductSliderCard {...product} />
            </Link>
          ))}
          <div className="card card-button">
            <button onClick={() => navigate(`/allproducts`)} className="btn">
              Explore More
            </button>
          </div>
        </Slider>
      </div>
    </>
  )
}

export default AllProductSlider
