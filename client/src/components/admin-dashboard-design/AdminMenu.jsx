import React from 'react'
import { NavLink } from 'react-router-dom'
//import.meta.env.REACT_APP_API
const AdminMenu = () => {
  return (
    <div className="list-group m-3">
      <NavLink
        to="/dashboard/admin/create-category"
        className="list-group-item list-group-item-action "
      >
        Create Category
      </NavLink>
      <NavLink
        to="/dashboard/admin/create-product"
        className="list-group-item list-group-item-action"
      >
        Create Product
      </NavLink>
      <NavLink
        to="/dashboard/admin/allproducts"
        className="list-group-item list-group-item-action"
      >
        All Products
      </NavLink>
      <NavLink
        to="/dashboard/admin/searchProduct"
        className="list-group-item list-group-item-action"
      >
        Search Product
      </NavLink>
      <NavLink
        to="/dashboard"
        className="list-group-item list-group-item-action"
      >
        Dashboard
      </NavLink>
      <NavLink to="/" className="list-group-item list-group-item-action">
        Home Page
      </NavLink>
    </div>
  )
}

export default AdminMenu
