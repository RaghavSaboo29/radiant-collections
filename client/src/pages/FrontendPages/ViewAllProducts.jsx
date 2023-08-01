import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../../components/layout/Layout'
import { Checkbox, Radio } from 'antd'
import { Prices } from '../../components/Prices'
import '../pages-css/AllProducts.css'
import AllProductCard from '../../components/card/AllProductCard'
import { Link } from 'react-router-dom'
import SpinnerPage from '../../components/spinner/SpinnerPage'

const ViewAllProducts = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState('')
  const [radio, setRadio] = useState([])
  const [open, setOpen] = useState(false)

  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [flag, setFlag] = useState(false)
  const [filterTotal, setFilterTotal] = useState(0)
  const [filterPage, setFilterPage] = useState(1)
  const [filterProducts, setFilterProducts] = useState([])
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
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

  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `https://radiant-collections-and-decor.onrender.com/api/v1/product/get-product/product-list/${page}`
      )
      setLoading(false)
      setProducts(data.products)
      setTotal(data.totalProducts)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const loadMore = async () => {
    try {
      if (checked.length || radio.length) {
        setLoading(true)
        const { data } = await axios.post(
          `https://radiant-collections-and-decor.onrender.com/api/v1/product/product-filters/${filterPage}`,
          {
            checked,
            radio,
          }
        )
        setLoading(false)
        setProducts([...products, ...data?.products])
        setFilterProducts([...products, ...data?.products])
      } else {
        setLoading(true)
        const { data } = await axios.get(
          `https://radiant-collections-and-decor.onrender.com/api/v1/product/get-product/product-list/${page}`
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
    if (page === 1) return
    loadMore()
  }, [page])

  useEffect(() => {
    if (filterPage === 1) return
    loadMore()
  }, [filterPage])

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `https://radiant-collections-and-decor.onrender.com/api/v1/product/product-filters/${filterPage}`,
        {
          checked,
          radio,
        }
      )
      setProducts(data?.products)
      setFilterProducts(data?.products)
      setFilterTotal(data?.totalFilterProducts)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts()
  }, [])
  //[checked.length, radio.length]
  useEffect(() => {
    if (checked.length || radio.length) {
      setFlag(true)
      filterProduct()
    }
  }, [checked, radio])

  return (
    <Layout>
      <div className="main-container">
        <div className="top-container">
          {flag ? (
            <div className="count">
              Number of Filtered Products: {filterTotal}
            </div>
          ) : (
            <div className="count">Number of Total Products: {total}</div>
          )}
        </div>

        <div className="bottom-container">
          <button
            className="btn btn-primary filter-btn"
            onClick={() => setOpen(!open)}
          >
            {' '}
            FILTERS
          </button>
          <div
            className={open ? 'filter-container active' : 'filter-container'}
          >
            {open ? <></> : <h3>Filters</h3>}
            <h4>Filter By Category</h4>
            <div className="category-filter-box">
              <Radio.Group onChange={(e) => setChecked(e.target.value)}>
                {categories.map((c) => (
                  <div key={c._id}>
                    <Radio value={c._id}> {c.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
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
            {loading && <SpinnerPage />}
            {products.length > 0 ? (
              products?.map((p) => (
                <Link
                  to={`/allproducts/${p._id}`}
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
    </Layout>
  )
}

export default ViewAllProducts
