import React from 'react'
import Layout from '../../components/layout/Layout'
import { useSearch } from '../../context/search'
import ProductSliderCard from '../../components/card/ProductSliderCard'
import '../pages-css/SearchPage.css'
import { Link } from 'react-router-dom'
const SearchPage = () => {
  const [values, setValues] = useSearch()
  return (
    <Layout>
      <div className="product-main-container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? 'No Products Found'
              : `Found ${values?.results.length}`}
          </h6>
        </div>
        <div className="product-container">
          {values?.results.map((v) => (
            <Link
              to={`/allproducts/${v._id}`}
              style={{ textDecoration: 'none' }}
              key={v._id}
            >
              <div className="search-product-card">
                <div className="search-img">
                  <img
                    src={v?.images[0].url}
                    alt=""
                    className="search-product-img"
                  />
                </div>
                <div className="search-product-details">
                  <h3 className="sp-name">
                    {v.name.length > 25
                      ? `${v.name.substring(0, 25)}...`
                      : v.name}
                  </h3>
                  <h4 className="sp-price">₹ {v.price}</h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default SearchPage
