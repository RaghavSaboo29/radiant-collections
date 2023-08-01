import express from 'express'

const router = express.Router()

import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js'
import {
  createProductController,
  deleteProductController,
  getAdminAllProductController,
  getAdminProductController,
  getAdminSearchController,
  getCategoryProductFilterController,
  getLatestProductController,
  getProductCategoryController,
  getProductController,
  getSearchProductController,
  getSimilarProductController,
  getSingleProductController,
  getTrendingProductController,
  productFilterController,
  updateProductController,
} from '../controllers/productController.js'

//ROUTES

router.get('/get-product/product-list/:page', getProductController)
router.get('/get-product/:id', getSingleProductController)
router.get('/get-trending', getTrendingProductController)
router.get('/get-latest', getLatestProductController)
router.get('/product-category/:slug/:page', getProductCategoryController)
router.get('/similar-product/:pid/:cid', getSimilarProductController)
router.get('/search/:keyword', getSearchProductController)

router.get('/admin-product/:page', getAdminProductController)
router.get('/admin-allproduct', getAdminAllProductController)
router.get('/admin-search/:keyword', getAdminSearchController)

router.put(
  '/update-product/:id',
  requireSignIn,
  isAdmin,
  updateProductController
)
router.delete(
  '/delete-product/:id',
  requireSignIn,
  isAdmin,
  deleteProductController
)
router.post('/create-product', requireSignIn, isAdmin, createProductController)
router.post('/product-filters/:page', productFilterController)
router.post(
  '/filter-category-product/:slug/:page',
  getCategoryProductFilterController
)
export default router
