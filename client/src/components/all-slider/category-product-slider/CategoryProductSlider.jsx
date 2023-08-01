import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../product-slider/ProductSlider.css'
import ProductSliderCard from '../../card/ProductSliderCard'
import { Link } from 'react-router-dom'
import SpinnerPage from '../../spinner/SpinnerPage'

const CategoryProductSlider = (props) => {
  const [categoryProduct, setCategoryProduct] = useState([])
  const [loading, setLoading] = useState(false)

  const getCategoryProduct = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `https://radiant-collections-and-decor.onrender.com/api/v1/product/product-category/${props.name}/1`
      )
      if (data?.success) {
        setCategoryProduct(data.products)
        setLoading(false)
      } else {
        res.status(404).send({
          success: false,
          message: 'Products not found.',
        })
        setLoading(false)
      }
    } catch (error) {
      setLoading(true)
      console.log(error)
      setLoading(false)
    }
  }
  useEffect(() => {
    getCategoryProduct()
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
      {loading && <SpinnerPage />}
      <div className="product-slider">
        <Link to={`/category/${props.name}`} style={{ textDecoration: 'none' }}>
          <h3 className="cat-heading">{props.name}</h3>
        </Link>
        <Slider {...settings}>
          {categoryProduct.slice(0, 7).map((tp) => (
            <Link
              to={`/category/${props.name}/${tp._id}`}
              style={{ textDecoration: 'none' }}
              key={tp._id}
            >
              <ProductSliderCard {...tp} />
            </Link>
          ))}
          <div className="card card-button">
            <Link
              to={`/category/${props.name}`}
              style={{ textDecoration: 'none' }}
            >
              <button className="btn">Explore More</button>
            </Link>
          </div>
        </Slider>
      </div>
    </>
  )
}

export default CategoryProductSlider
