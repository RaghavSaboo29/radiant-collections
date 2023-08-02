import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import '../pages-css/AllProducts.css'
import { Radio } from 'antd'
import { Prices } from '../../components/Prices'
import AllProductCard from '../../components/card/AllProductCard'
import SpinnerPage from '../../components/spinner/SpinnerPage'

const SingleCategory = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [radio, setRadio] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [filterTotal, setFilterTotal] = useState(0)
  const [filterPage, setFilterPage] = useState(1)
  const [filterProducts, setFilterProducts] = useState([])
  const [flag, setFlag] = useState(false)
  const [open, setOpen] = useState(false)
  const params = useParams()

  const getAllCategoryProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `https://radiant-collections-and-decor.onrender.com/api/v1/product/product-category/${params.slug}/${page}`
      )
      setLoading(false)
      setTotal(data.totalProducts)
      setProducts(data.products)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const loadMore = async () => {
    try {
      if (radio.length) {
        setLoading(true)
        const { data } = await axios.post(
          `https://radiant-collections-and-decor.onrender.com/api/v1/product/filter-category-product/${params.slug}/${filterPage}`,
          {
            radio,
          }
        )
        setLoading(false)
        setProducts([...products, ...data?.products])
        setFilterProducts([...products, ...data?.products])
      } else {
        setLoading(true)
        const { data } = await axios.get(
          `https://radiant-collections-and-decor.onrender.com/api/v1/product/product-category/${params.slug}/${page}`
        )
        setLoading(false)
        setProducts([...products, ...data?.products])
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params?.slug) getAllCategoryProducts()
  }, [params?.slug])

  useEffect(() => {
    if (page === 1) return
    loadMore()
  }, [page])

  useEffect(() => {
    if (filterPage === 1) return
    loadMore()
  }, [filterPage])

  const filterProduct = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post(
        `https://radiant-collections-and-decor.onrender.com/api/v1/product/filter-category-product/${params.slug}/${filterPage}`,
        {
          radio,
        }
      )
      setLoading(false)
      setProducts(data?.products)
      setFilterProducts(data?.products)
      setFilterTotal(data?.totalFilterProducts)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!radio.length) getAllCategoryProducts()
  }, [])

  useEffect(() => {
    if (radio.length) {
      setFlag(true)
      filterProduct()
    }
  }, [radio])

  return (
    <Layout>
      {loading ? (
        <SpinnerPage />
      ) : (
        <div className="main-container">
          <div className="top-container">
            {' '}
            {flag ? (
              <div className="count">
                Number of Filtered Products: {filterTotal}
              </div>
            ) : (
              <div className="count">Number of Products: {total}</div>
            )}
          </div>
          <h3 className="category-heading">
            View Products Related to {params.slug.toUpperCase()}
          </h3>
          <div className="bottom-container">
            <button
              className="btn btn-primary filter-btn"
              onClick={() => setOpen(!open)}
            >
              {' '}
              FILTERS
            </button>

            <div
              className={
                open ? 'filter-container active cat' : 'filter-container'
              }
            >
              {open ? <></> : <h3>Filters</h3>}
              <h4>Filter By Price</h4>
              <div className="price-filter-box">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <div className="reset-filter">
                <button
                  onClick={() => window.location.reload()}
                  className="btn btn-danger
              "
                >
                  RESET FILTERS
                </button>
              </div>
            </div>

            <div className="allproduct-container grid-four">
              {products.length > 0 ? (
                products?.map((p) => (
                  <Link
                    to={`/category/${params.slug}/${p._id}`}
                    className="product-link"
                    style={{ textDecoration: 'none' }}
                    key={p._id}
                  >
                    <AllProductCard {...p} key={p._id} />
                  </Link>
                ))
              ) : (
                <h1 className="d-flex align-items-center justify-content-center warn">
                  NO PRODUCTS FOUND
                </h1>
              )}
            </div>
          </div>
          {flag ? (
            <div className="btn-container">
              {filterProducts.length < filterTotal && (
                <button
                  className="btn btn-outline-dark"
                  onClick={(e) => {
                    e.preventDefault()
                    setFilterPage(filterPage + 1)
                  }}
                >
                  {loading ? 'LOADING' : 'LOAD MORE'}
                </button>
              )}
            </div>
          ) : (
            <div className="btn-container">
              {products && products.length < total && (
                <button
                  className="btn btn-outline-dark"
                  onClick={(e) => {
                    e.preventDefault()

                    setPage(page + 1)
                  }}
                >
                  {loading ? 'LOADING' : 'LOAD MORE'}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </Layout>
  )
}

export default SingleCategory
