import React from 'react'
import './GridLayout.css'
import img1 from '../../images/showpiece.jpg'
import img2 from '../../images/bedsheet.jpg'
import img3 from '../../images/organizer.jpg'
import img4 from '../../images/crockery.jpeg'
import img5 from '../../images/category-slider/walldecor.jpeg'

const GridLayout = () => {
  return (
    <>
      <h3 className="grid-heading">Unique Mix of All</h3>
      <div className="grid-container">
        <div className="item item1">
          <a href="/category/showpieces">
            <img src={img1} alt="showpiece" />
          </a>
        </div>
        <div className="item item2">
          <a href="/category/bedsheets">
            <img src={img2} alt="bedsheets" />
          </a>
        </div>
        <div className="item item3">
          <a href="/category/organizers">
            <img src={img3} alt="organizers" />
          </a>
        </div>
        <div className="item item4">
          <a href="/category/wall-hangings">
            <img src={img5} alt="wallhanging" />
          </a>
        </div>
        <div className="item item5">
          <a href="/category/crockery">
            <img src={img4} alt="crockery" />
          </a>
        </div>
      </div>
    </>
  )
}

export default GridLayout
