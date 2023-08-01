import React from 'react'
import AdminMenu from '../../components/admin-dashboard-design/AdminMenu'
import Layout from '../../components/layout/Layout'

const SearchProduct = () => {
  return (
    <Layout title={'admin search'}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <form action=""></form>
        </div>
      </div>
    </Layout>
  )
}

export default SearchProduct
