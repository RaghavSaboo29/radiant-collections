import express from 'express'
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js'
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from '../controllers/categoryController.js'

const router = express.Router()

//routes
//CREATE CATEGORY
router.post(
  '/create-category',
  requireSignIn,
  isAdmin,
  createCategoryController
)

//UPDATE CATEGORY
router.put(
  '/update-category/:id',
  requireSignIn,
  isAdmin,
  updateCategoryController
)

//GET ALL CATEGORY
router.get('/get-category', categoryController)

//SINGLE CATEGORY
router.get('/single-category/:id', singleCategoryController)

//DELETE CATEGROY
router.delete(
  '/delete-category/:id',
  requireSignIn,
  isAdmin,
  deleteCategoryController
)

export default router
