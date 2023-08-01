import React, { useEffect, useState } from 'react'
import './MyImg.css'
const MyImg = ({ images }) => {
  const [mainImage, setMainImage] = useState()

  return (
    <>
      <div className="img-container">
        <div className="main-img">
          <img
            src={mainImage ? mainImage?.url : images[0]?.url}
            alt="click on the below img"
          />
        </div>
        <div className="grid grid-four-col">
          {images.map((index, i) => (
            <img
              src={index.url}
              onClick={() => setMainImage(index)}
              alt="imgs"
              key={i}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default MyImg
