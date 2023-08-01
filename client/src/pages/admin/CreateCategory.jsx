import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/admin-dashboard-design/AdminMenu'
import axios from 'axios'

const CreateCategory = () => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [editedCategory, setEditedCategory] = useState(null)
  //get all categories

  const saveCategory = async (e) => {
    e.preventDefault()
    try {
      if (editedCategory) {
        const { editedData } = await axios.put(
          `https://radiant-collections-and-decor.onrender.com/api/v1/category/update-category/${editedCategory._id}`,
          { name }
        )
      } else {
        const { data } = await axios.post(
          'https://radiant-collections-and-decor.onrender.com/api/v1/category/create-category',
          { name }
        )
      }
      getAllCategory()
      setName('')
      setEditedCategory(null)
    } catch (error) {
      console.log(error)
    }
  }

  const editCategory = (category) => {
    setEditedCategory(category)
    setName(category.name)
  }

  const deleteCategory = async (id) => {
    const data = await axios.delete(
      `https://radiant-collections-and-decor.onrender.com/api/v1/category/delete-category/${id}`
    )
    getAllCategory()
  }

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

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h3>Manage Categories</h3>
          <div className="p-3 w-50">
            <h4>
              {editedCategory
                ? `Edit Category ${editedCategory.name}`
                : 'Create Category'}
            </h4>
            <form onSubmit={saveCategory} className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button className="btn btn-primary">Save</button>
            </form>
          </div>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((c) => {
                  return (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => editCategory(c)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger m-1"
                            onClick={() => deleteCategory(c._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory
