import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios'

import showpieces from '../../images/showpiece.jpg'
import bedsheets from '../../images/category-page/bedsheets-page.jpg'
import organizers from '../../images/category-page/organzier-page.jpg'
import wallhangings from '../../images/category-slider/walldecor.jpeg'
import crockery from '../../images/category-page/crockery-page.jpg'
import saree from '../../images/category-page/saree-page.jpg'
import womenkurta from '../../images/category-page/womenkurta-page.jpg'
import cushions from '../../images/category-page/cushions-page.jpg'
import kitchenware from '../../images/category-page/kitchenware-page.jpg'
import '../pages-css/AllCategory.css'
import { Link } from 'react-router-dom'
import SpinnerPage from '../../components/spinner/SpinnerPage'
const ViewAllCategories = () => {
  const images = [
    wallhangings,
    organizers,
    showpieces,
    bedsheets,
    cushions,
    womenkurta,
    saree,
    crockery,
    kitchenware,
  ]
  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(false)
  const getAllCategory = async () => {
    setLoading(true)
    const { data } = await axios.get(
      'https://radiant-collections-and-decor.onrender.com/api/v1/category/get-category'
    )
    if (data?.success) {
      setLoading(false)
      setCategory(data.category)
    }
  }

  useEffect(() => {
    getAllCategory()
  }, [])

  return (
    <Layout>
      {loading ? (
        <SpinnerPage />
      ) : (
        <div className="category-container">
          {category.map((c, index) => (
            <Link
              to={`/category/${c.slug}`}
              key={c._id}
              style={{ textDecoration: 'none' }}
            >
              <div className="category-item">
                <div className="category-img">
                  <img
                    src={images[index]}
                    alt=""
                    className="category-item-img"
                  />
                </div>
                <h4 className="category-item-name">{c.name}</h4>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Layout>
  )
}

export default ViewAllCategories
