import productModel from '../models/productModel.js'
import categoryModel from '../models/categoryModel.js'
import cloudinary from 'cloudinary'

//ADMIN ROUTES

export const createProductController = async (req, res) => {
  try {
    let images = []

    if (typeof req.body.images === 'string') {
      images.push(req.body.images)
    } else {
      images = req.body.images
    }

    const imagesLinks = []

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: 'Products',
      })

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      })
    }
    req.body.images = imagesLinks

    const product = await productModel.create(req.body)
    res.status(201).send({
      success: true,
      message: 'Product created successfully',
      product,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: 'error in creating product',
    })
  }
}

// UPDATE PRODUCT

export const updateProductController = async (req, res) => {
  let product = await productModel.findById(req.params.id)

  if (!product) {
    return res.status(404).send({
      success: false,
      message: 'Product Not Found',
    })
  }

  // Images Start Here
  let images = []

  if (typeof req.body.images === 'string') {
    images.push(req.body.images)
  } else {
    images = req.body.images
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    const imagesLinks = []

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: 'Products',
      })

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      })
    }

    req.body.images = imagesLinks
  }

  product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).send({
    success: true,
    product,
  })
}

// DELETE PRODUCT

export const deleteProductController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id)

    if (!product) {
      return res.status(404).send({
        success: false,
        message: 'Product Not Found',
      })
    }

    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    await productModel.findByIdAndDelete(product.id)
    res.status(200).send({
      success: true,
      message: 'Product Deleted successfully',
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error while deleting product',
      error,
    })
  }
}

// GET PRODUCT

export const getAdminProductController = async (req, res) => {
  try {
    const perPage = 25
    const page = req.params.page
    const totalProducts = await productModel.find({})
    const products = await productModel
      .find({})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 })
    res.status(200).send({
      success: true,
      products,
      totalProducts: totalProducts.length,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in getting products',
      error: error.message,
    })
  }
}

export const getAdminAllProductController = async (req, res) => {
  try {
    const totalProducts = await productModel.find({}).sort({ product_id: 1 })

    res.status(200).send({
      success: true,
      totalProducts,
      totalProductsLength: totalProducts.length,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in getting products',
      error: error.message,
    })
  }
}

export const getAdminSearchController = async (req, res) => {}

//  USER ROUTES

// GET PRODUCTS

export const getProductController = async (req, res) => {
  try {
    const perPage = 20
    const page = req.params.page
    const totalProducts = await productModel.find({})
    const products = await productModel
      .find({})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 })
    res.status(200).send({
      success: true,
      message: 'All Products',
      products,
      totalProducts: totalProducts.length,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Erorr in getting products',
      error: error.message,
    })
  }
}

export const productFilterController = async (req, res) => {
  try {
    const perPage = 12
    const page = req.params.page
    const { checked, radio } = req.body
    let args = {}
    //checked.length>0
    if (checked) args.category = checked
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
    const products = await productModel.find(args)
    const totalFilterProducts = products.length

    if (products.length > perPage) {
      const products = await productModel
        .find(args)
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 })

      res.status(200).send({
        success: true,
        products,
        totalFilterProducts,
      })
    } else {
      res.status(200).send({
        success: true,
        products,
        totalFilterProducts,
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: 'error while filtering',
    })
  }
}

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id)
    if (!product) {
      return res.status(404).send({
        success: false,
        message: 'Product Not Found',
      })
    } else {
      res.status(200).send({
        success: true,
        message: 'Single Product Found',
        product,
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in getting Single product',
      error: error.message,
    })
  }
}

export const getTrendingProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({ trending: 'true' })
      .limit(25)
      .sort({ createdAt: -1 })

    if (products.length > 0) {
      res.status(200).send({
        success: true,
        countTotal: products.length,
        message: 'Trending Products Found',
        products,
      })
    } else {
      res.status(404).send({
        success: false,
        message: 'Trending Products Not Available',
        products,
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in getting Trending products',
      error: error.message,
    })
  }
}

export const getLatestProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(25)
    res.status(200).send({
      success: true,
      message: 'Latest Products Found',
      products,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in getting Latest products',
      error: error.message,
    })
  }
}

export const getSimilarProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .limit(4)
      .populate('category')
    res.status(200).send({
      success: true,
      products,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      error,
      message: 'Error While Getting similar products',
    })
  }
}

export const getSearchProductController = async (req, res) => {
  try {
    const { keyword } = req.params
    const results = await productModel.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    })
    res.json(results)
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      error,
      message: 'Error in Search API',
    })
  }
}

export const getProductCategoryController = async (req, res) => {
  try {
    const perPage = 12
    const page = req.params.page
    const category = await categoryModel.findOne({ slug: req.params.slug })
    const totalProducts = await productModel
      .find({ category })
      .populate('category')
    const products = await productModel
      .find({ category })
      .populate('category')
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 })

    res.status(200).send({
      success: true,
      totalProducts: totalProducts.length,
      category,
      products,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      error,
      message: 'Error While Getting products',
    })
  }
}

export const getCategoryProductFilterController = async (req, res) => {
  try {
    const perPage = 12
    const page = req.params.page
    const { radio } = req.body
    let args = {}

    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }

    const category = await categoryModel.findOne({ slug: req.params.slug })

    const products = await productModel
      .find({ category, price: args.price })
      .populate('category')

    const totalFilterProducts = products.length

    if (products.length > perPage) {
      const products = await productModel
        .find({ category, price: args.price })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 })

      res.status(200).send({
        success: true,
        products,
        totalFilterProducts,
      })
    } else {
      res.status(200).send({
        success: true,
        products,
        totalFilterProducts,
      })
    }
  } catch (error) {
    console.log(error)
  }
}
