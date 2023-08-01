import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/FrontendPages/HomePage'

import Login from './pages/authPages/Login'
import Dashboard from './pages/admin/Dashboard'
import AdminRoute from './components/routes/AdminRoute'
import CreateCategory from './pages/admin/CreateCategory'
import CreateProducts from './pages/admin/CreateProducts'
import AllProducts from './pages/admin/AllProducts'
import UpdateProduct from './pages/admin/UpdateProduct'
import ViewAllProducts from './pages/FrontendPages/ViewAllProducts'
import SingleProduct from './pages/FrontendPages/SingleProduct'
import SingleCategory from './pages/FrontendPages/SingleCategory'
import ViewAllCategories from './pages/FrontendPages/ViewAllCategories'
import GoToTop from './components/extra-function-btn/GoToTop'
import WhatsAppBtn from './components/extra-function-btn/WhatsAppBtn'
import SearchPage from './pages/FrontendPages/SearchPage'
import FeaturedPage from './pages/FrontendPages/FeaturedPage'
import AboutUs from './pages/FrontendPages/AboutUs'
import SearchProduct from './pages/admin/SearchProduct'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route
          path="/trending"
          element={
            <FeaturedPage
              name={'get-trending'}
              path={'trending'}
              heading={'Trending Products'}
            />
          }
        />
        <Route path="/trending/:id" element={<SingleProduct />} />
        <Route
          path="/latest"
          element={
            <FeaturedPage
              name={'get-latest'}
              path={'latest'}
              heading={'Newly Launched Products'}
            />
          }
        />
        <Route path="/latest/:id" element={<SingleProduct />} />
        <Route path="/allproducts" element={<ViewAllProducts />} />
        <Route path="/allproducts/:id" element={<SingleProduct />} />
        <Route path="/category" element={<ViewAllCategories />} />
        <Route path="/category/:slug" element={<SingleCategory />} />
        <Route path="/category/:slug/:id" element={<SingleProduct />} />

        {/* ADMIN ROUTES */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="" element={<Dashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProducts />} />
          <Route path="admin/allproducts" element={<AllProducts />} />
          <Route path="admin/searchProduct" element={<SearchProduct />} />
          <Route path="admin/product/:id" element={<UpdateProduct />} />
        </Route>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <WhatsAppBtn />
      <GoToTop />
    </>
  )
}

export default App
