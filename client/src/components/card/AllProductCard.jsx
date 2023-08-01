import React from 'react'
import './AllProductCard.css'
const AllProductCard = (item) => {
  return (
    <div className="product-card">
      <div className="product-card-image">
        <img
          src={item?.images[0].url}
          alt="product-image"
          className="mainImg"
        />
      </div>
      <div className="product-card-details">
        <h2 className="product-name">
          {item.name.length > 25
            ? `${item.name.substring(0, 25)}...`
            : item.name}
        </h2>
        <div className="product-price">₹ {item.price}</div>
      </div>
    </div>
  )
}

export default AllProductCard
