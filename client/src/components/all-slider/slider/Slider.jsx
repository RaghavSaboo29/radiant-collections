import React from 'react'
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel'
import img1 from '../../../images/img1.jpg'
import img2 from '../../../images/img2.jpg'
import img3 from '../../../images/img3.jpg'
import './Slider.css'
import { Link } from 'react-router-dom'

const Slider = () => {
  return (
    <>
      <Carousel
        className="slider"
        prevIcon={<span className="carousel-control-prev-icon changed" />}
        nextIcon={<span className="carousel-control-next-icon changed" />}
      >
        <Carousel.Item className="slider-item  " interval={2000}>
          <Link to={'/trending'}>
            <img className="" src={img2} alt="Second slide" />

            <Carousel.Caption className="slider-content">
              <h3>Checkout the latest Trend</h3>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
        <Carousel.Item className="slider-item slider-item-1" interval={2000}>
          <Link to={'/allproducts'}>
            <img className="" src={img1} alt="First slide" />
            <Carousel.Caption className="slider-content">
              <h3>Explore Wide variety of Products </h3>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
        <Carousel.Item className="slider-item " interval={2000}>
          <img className="" src={img3} alt="Third slide" />

          <Carousel.Caption className="slider-content ">
            <h3>Browse the Latest collection</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  )
}

export default Slider
