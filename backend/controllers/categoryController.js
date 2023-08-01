import categoryModel from '../models/categoryModel.js'
import slugify from 'slugify'
import productModel from '../models/productModel.js'
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body
    if (!name) {
      return res.status(401).send({
        message: 'Name is requried',
      })
    }
    const existingCategory = await categoryModel.findOne({ name })
    if (existingCategory) {
      return res.status(200).send({
        message: 'Category Exists Already',
      })
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save()
    res.status(201).send({
      success: true,
      message: 'new category created',
      category,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Category',
      error,
    })
  }
}

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body
    const { id } = req.params
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    )
    res.status(200).send({
      success: true,
      message: 'Category Updated Successfully',
      category,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'error while updating',
      error,
    })
  }
}

export const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({})
    res.status(200).send({
      success: true,
      message: 'List of All Categories',
      category,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'error while getting all categories',
      error,
    })
  }
}

export const singleCategoryController = async (req, res) => {
  try {
    const singleCategory = await categoryModel.findById(req.params.id)
    res.status(200).send({
      success: true,
      message: 'Category Obtained',
      singleCategory,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'error while getting respective category',
      error,
    })
  }
}

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params
    await categoryModel.findByIdAndDelete(id)

    res.status(200).send({
      success: true,
      message: 'Category Deleted',
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'error while deleting respective category',
      error,
    })
  }
}
