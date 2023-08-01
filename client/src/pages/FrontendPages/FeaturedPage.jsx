import React, { useEffect, useState } from 'react'
import '../pages-css/FeaturedPage.css'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SpinnerPage from '../../components/spinner/SpinnerPage'
const FeaturedPage = (props) => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const getFeaturedProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/${props.name}`
      )
      if (data?.success) {
        setLoading(false)
        setFeaturedProducts(data.products)
      }
    } catch (error) {
      setLoading(true)
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getFeaturedProducts()
  }, [])

  return (
    <Layout>
      <div className="fp-container">
        {loading && <SpinnerPage />}
        <div className="fp-top-container">
          <h3 className="fp-heading">{props.heading.toUpperCase()}</h3>
        </div>
        <div className="fp-grid">
          {featuredProducts.map((fp) => (
            <Link
              key={fp._id}
              to={`/${props.path}/${fp._id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="fp-card">
                <div className="fp-img">
                  <img src={fp?.images[0]?.url} alt="" />
                </div>
                <div className="fp-details">
                  <h3 className="fp-name">
                    {fp.name.length > 25
                      ? `${fp.name.substring(0, 25)}...`
                      : fp.name}{' '}
                  </h3>
                  <h4 className="fp-price">₹ {fp.price} </h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default FeaturedPage
