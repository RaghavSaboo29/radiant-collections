import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/admin-dashboard-design/AdminMenu'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Dashboard = () => {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState()
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `https://radiant-collections-and-decor.onrender.com/api/v1/product/admin-allproduct`
      )
      setProducts(data.totalProducts)
      setTotal(data.totalProductsLength)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <Layout title={'admin dashboard'}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            Total number of Products: {total}
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Product Id</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Product Mongo Id</th>
                    <th scope="col">Product Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((p) => {
                    return (
                      <React.Fragment key={p._id}>
                        <tr>
                          <td>{p.product_id}</td>
                          <td>
                            <Link to={`/dashboard/admin/product/${p._id}`}>
                              {p.name}
                            </Link>
                          </td>
                          <td>{p._id}</td>
                          <td>₹ {p.price}</td>
                        </tr>
                      </React.Fragment>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
