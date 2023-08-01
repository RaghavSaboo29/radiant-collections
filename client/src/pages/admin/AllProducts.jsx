import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/admin-dashboard-design/AdminMenu'
import { Link } from 'react-router-dom'
import axios from 'axios'
const AllProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `https://radiant-collections-and-decor.onrender.com/api/v1/product/admin-product/${page}`
      )

      setLoading(false)
      setProducts(data.products)
      setTotal(data.totalProducts)
    } catch (error) {
      console.log(error)
    }
  }

  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `https://radiant-collections-and-decor.onrender.com/api/v1/product/admin-product/${page}`
      )
      setLoading(false)
      setProducts([...products, ...data?.products])
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
    getAllProducts()
  }, [])

  return (
    <Layout>
      <div className="row container-fluid ">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h3>View All Products</h3>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p._id}`}
                className="product-link"
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="card m-2 border border-dark"
                  style={{ width: '18rem' }}
                >
                  <img
                    src={p.images[0].url}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.product_id}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="m-2 p-3 d-flex align-items-center justify-content-center">
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
      </div>
    </Layout>
  )
}

export default AllProducts
