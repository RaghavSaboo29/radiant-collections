import React from 'react'
import './GridLayout.css'
import img1 from '../../images/showpiece.jpg'
import img2 from '../../images/bedsheet.jpg'
import img3 from '../../images/organizer.jpg'
import img4 from '../../images/crockery.jpeg'
import img5 from '../../images/category-slider/walldecor.jpeg'
import { Link } from 'react-router-dom'

const GridLayout = () => {
  return (
    <>
      <h3 className="grid-heading">Unique Mix of All</h3>
      <div className="grid-container">
        <div className="item item1">
          <Link to="/category/showpieces" style={{ textDecoration: 'none' }}>
            <img src={img1} alt="" />
          </Link>
        </div>
        <div className="item item2">
          <Link to="/category/bedsheets" style={{ textDecoration: 'none' }}>
            <img src={img2} alt="" />
          </Link>
        </div>
        <div className="item item3">
          <Link to="/category/organizers" style={{ textDecoration: 'none' }}>
            <img src={img3} alt="" />
          </Link>
        </div>
        <div className="item item4">
          <Link to="/category/wall-hangings" style={{ textDecoration: 'none' }}>
            <img src={img5} alt="" />
          </Link>
        </div>
        <div className="item item5">
          <Link to="/category/crockery" style={{ textDecoration: 'none' }}>
            <img src={img4} alt="" />
          </Link>
        </div>
      </div>
    </>
  )
}

export default GridLayout
