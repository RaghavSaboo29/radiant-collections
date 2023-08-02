import React, { useEffect, useState } from 'react'
import '../pages-css/SingleProduct.css'
import Layout from '../../components/layout/Layout'
import ProductSliderCard from '../../components/card/ProductSliderCard'
import '../../components/all-slider/product-slider/ProductSlider.css'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import MyImg from '../../components/all-slider/product-slider/MyImg'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import SpinnerPage from '../../components/spinner/SpinnerPage'

const SingleProduct = () => {
  const [product, setProduct] = useState('')
  const [cat, setCat] = useState('')
  const [images, setImages] = useState([])
  const [similarProducts, setSimilarProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const navigate = useNavigate()

  // GET SINGLE PRODUCT
  const getSingleProduct = async () => {
    setLoading(true)
    const { data } = await axios.get(
      `https://radiant-collections-and-decor.onrender.com/api/v1/product/get-product/${params.id}`
    )
    setLoading(false)
    setProduct(data.product)
    setImages(data.product.images)
    getSingleCategory(data.product.category)
    getSimilarProduct(data?.product._id, data?.product.category)
  }

  // GET SIMILAR PRODUCTS

  const getSimilarProduct = async (pid, cid) => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `https://radiant-collections-and-decor.onrender.com/api/v1/product/similar-product/${pid}/${cid}`
      )
      setLoading(false)
      setSimilarProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }

  // GET SINGLE CATEGORY

  const getSingleCategory = async (catid) => {
    const { data } = await axios.get(
      `https://radiant-collections-and-decor.onrender.com/api/v1/category/single-category/${catid}`
    )
    if (data?.success) {
      setCat(data.singleCategory)
    }
  }

  function NewlineText(props) {
    const text = props.text
    return text?.split('\n')?.map((str, i) => (
      <React.Fragment key={i}>
        {' '}
        {str}
        <br />
      </React.Fragment>
    ))
  }

  useEffect(() => {
    if (params?.id) getSingleProduct()
  }, [params?.id])

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
    <Layout>
      {loading ? (
        <SpinnerPage />
      ) : (
        <>
          <div className="product-wrapper">
            <div className="image-section">
              <MyImg images={images} />
            </div>
            <div className="detail-section">
              <div className="detail-1">
                <h2 className="product-name">{product.name}</h2>
                <h6 className="product-id">
                  Product Id: #{product.product_id}
                </h6>
                <span className="price">₹ {product.price}</span>
                <br />
                <h3 className="category-head">Category : </h3>{' '}
                <span className="category">{cat.name}</span>{' '}
              </div>
              <div className="detail-2">
                <h3 className="description">Description :</h3>

                <NewlineText text={product.description} />
              </div>
              <br />
              <div className="detail-3">
                <h4 className="stock-head">
                  Stock :
                  <span className="stock">
                    {product.quantity ? ' Available' : ' Not Available'}
                  </span>
                </h4>
                <br />
                <h5 className="note">
                  Shipping Available Across India and Overseas{' '}
                </h5>
                <br />
              </div>
              <div className="detail-4">
                <p>
                  To Order the particular item or to know more about it, Kindly
                  Press the WhatsApp icon (bottom right of screen) and enter the
                  <span> Product Id</span>.
                </p>
              </div>
            </div>
          </div>
          <>
            <div className="similar-product">
              <h3 className="sp-head">Similar Products</h3>
              {similarProducts.length > 0 ? (
                <div className="product-slider">
                  <Slider {...settings}>
                    {similarProducts.map((sp) => (
                      <a
                        href={`/category/${cat.slug}/${sp._id}`}
                        key={sp._id}
                        style={{ textDecoration: 'none' }}
                      >
                        <ProductSliderCard {...sp} key={sp._id} />
                      </a>
                    ))}
                    <div className="card card-button">
                      <button
                        onClick={() => navigate(`/category/${cat.slug}`)}
                        className="btn"
                      >
                        Explore More
                      </button>
                    </div>
                  </Slider>
                </div>
              ) : (
                <p className="sp-para">No Similar Products Found</p>
              )}
            </div>
          </>
        </>
      )}
    </Layout>
  )
}

export default SingleProduct
