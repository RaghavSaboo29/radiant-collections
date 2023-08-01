import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/admin-dashboard-design/AdminMenu'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './createProducts.css'
const CreateProducts = () => {
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [product_id, setProduct_id] = useState('')
  const [category, setCategory] = useState('')
  const [quantity, setQuantity] = useState('')
  const [trending, setTrending] = useState('')
  const [images, setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])

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

  const handleCreate = async (e) => {
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

      const { data } = axios.post(
        'https://radiant-collections-and-decor.onrender.com/api/v1/product/create-product',
        productData
      )
      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
    } catch (error) {
      console.log(error)
    }
  }

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files)

    setImages([])
    setImagesPreview([])

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
          <h3>Create Products</h3>

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
                rows={5}
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
                <option value="false">false</option>
                <option value="true">true</option>
              </select>
            </div>

            <div className="mb-3">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div className="mb-3" id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleCreate}>
                CREATE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProducts
