import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { GoSearch } from 'react-icons/go'
import { CiMenuBurger } from 'react-icons/ci'
import logo from '../../images/final-logo.png'
import './Navbar2.css'
import { useSearch } from '../../context/search'
const Navbar2 = () => {
  const [values, setValues] = useSearch()

  const [category, setCategory] = useState([])
  const [search, setSearch] = useState(false)
  const [menu, setMenu] = useState(false)
  const [input, setInput] = useState('')

  const navigate = useNavigate()

  const getAllCategory = async () => {
    const { data } = await axios.get(
      'https://radiant-collections-and-decor.onrender.com/api/v1/category/get-category'
    )
    if (data?.success) {
      setCategory(data.category)
    }
  }

  useEffect(() => {
    getAllCategory()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.get(
        `https://radiant-collections-and-decor.onrender.com/api/v1/product/search/${values.keyword}`
      )
      setValues({ ...values, results: data })
      navigate('/search')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <header className="heading-2">
        <h3>!!WELCOME TO RADIANT COLLECTIONS AND DECOR!!</h3>
      </header>
      <nav className="navbar-2">
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <div className="logo-2">
            <img src={logo} alt="logo" />
          </div>
        </Link>
        <ul className={menu ? 'navlinks-2 active' : 'navlinks-2'}>
          {category.map((c) => (
            <React.Fragment key={c._id}>
              <li>
                <a
                  className="navLink"
                  href={`/category/${c.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  {c.name}
                </a>
              </li>
            </React.Fragment>
          ))}
          <li>
            <a
              href="https://radiant-collections-and-decor.onrender.com/allproducts"
              className="navLink"
              style={{ textDecoration: 'none' }}
            >
              <b> Shop All</b>
            </a>
          </li>
        </ul>

        <div className="search-box">
          <GoSearch
            className="search-icon"
            onClick={() => {
              setSearch(!search)
              setMenu(false)
            }}
          />
          {search ? (
            <>
              <form action="" role="search" onSubmit={handleSubmit}>
                <input
                  type="search"
                  value={values.keyword}
                  className="search-input"
                  placeholder="Search..."
                  onChange={(e) =>
                    setValues({ ...values, keyword: e.target.value })
                  }
                />
              </form>
            </>
          ) : (
            <></>
          )}
        </div>
        <CiMenuBurger
          className="menu-icon"
          onClick={() => {
            setMenu(!menu)
            setSearch(false)
          }}
        />
      </nav>
    </>
  )
}

export default Navbar2
