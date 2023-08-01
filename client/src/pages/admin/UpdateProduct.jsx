import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/admin-dashboard-design/AdminMenu'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import './createProducts.css'
const UpdateProduct = () => {
  const navigate = useNavigate()
  const params = useParams()

  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [product_id, setProduct_id] = useState('')
  const [category, setCategory] = useState('')
  const [quantity, setQuantity] = useState('')
  const [trending, setTrending] = useState('')
  const [images, setImages] = useState([])
  const [oldImages, setOldImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])
  const [id, setId] = useState('')

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://radiant-collections-and-decor.onrender.com/api/v1/product/get-product/${params.id}`
      )

      setName(data.product.name)
      setProduct_id(data.product.product_id)
      setDescription(data.product.description)
      setPrice(data.product.price)
      setQuantity(data.product.quantity)
      setCategory(data.product.category)
      setOldImages(data.product.images)
      setId(data.product._id)
      setTrending(data.product.trending)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getSingleProduct()
  }, [])

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        'https://radiant-collections-and-decor.onrender.com/api/v1/category/get-category'
      )
      if (data.success) {
        setCategories(data.category)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllCategory()
  }, [])

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const productData = new FormData()
      productData.append('name', name)
      productData.append('description', description)
      productData.append('price', price)
      productData.append('quantity', quantity)
      productData.append('category', category)
      productData.append('product_id', product_id)
      productData.append('trending', trending)

      images.forEach((image) => {
        productData.append('images', image)
      })

      const { data } = axios.put(
        `https://radiant-collections-and-decor.onrender.com/api/v1/product/update-product/${id}`,
        productData
      )
      if (data?.success) {
        res.status(500).send({
          success: false,
          message: 'Product not updated',
        })
      } else {
        setTimeout(() => {
          navigate('/dashboard/admin/allproducts')
        }, 1000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (e) => {
    try {
      let answer = window.prompt(
        'Are You Sure want to delete this product ? Type Yes '
      )
      if (!answer) return
      const { data } = await axios.delete(
        `https://radiant-collections-and-decor.onrender.com/api/v1/product/delete-product/${id}`
      )
      navigate('/dashboard/admin/allproducts')
    } catch (error) {
      console.log(error)
    }
  }

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files)

    setImages([])
    setImagesPreview([])
    setOldImages([])

    files.forEach((file) => {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result])
          setImages((old) => [...old, reader.result])
        }
      }

      reader.readAsDataURL(file)
    })
  }

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h3>Update Product</h3>

          <div className="m-1 w-75">
            <div className="mb-3">
              <label className="mb-2">Product Id</label>
              <input
                type="number"
                value={product_id}
                placeholder="Enter Unique Product Id"
                className="form-control"
                onChange={(e) => setProduct_id(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="mb-2">Name</label>
              <input
                type="text"
                value={name}
                placeholder="Enter Product's name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="mb-2">Description</label>
              <textarea
                type="text"
                rows={10}
                value={description}
                placeholder="Enter Product's description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="mb-2">Price</label>
              <input
                type="number"
                value={price}
                placeholder="Enter Product's  Price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="">In Stock</label>

              <div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="true"
                    value="true"
                    checked={quantity === 'true'}
                    onChange={(e) => setQuantity(e.target.value)}
                    id="flexRadioDefault1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    True
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="false"
                    value="false"
                    checked={quantity === 'false'}
                    onChange={(e) => setQuantity(e.target.value)}
                    id="flexRadioDefault2"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    False
                  </label>
                </div>
              </div>
            </div>
            <div className="m-1 w-25">
              <label className="mb-2">Category</label>
              <select
                className="form-select mb-3"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="m-1 w-25">
              <label className="mb-2">Set Trending</label>
              <select
                className="form-select mb-3"
                value={trending}
                onChange={(e) => setTrending(e.target.value)}
              >
                <option value="">SELECT SIZE</option>
                <option value="false">false</option>
                <option value="true">true</option>
              </select>
            </div>

            <div className="mb-3">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div className="mb-3" id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div className="mb-3" id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleUpdate}>
                UPDATE PRODUCT
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                DELETE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UpdateProduct
