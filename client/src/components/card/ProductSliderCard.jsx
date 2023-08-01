import React from 'react'
import './ProductSliderCard.css'

const ProductSliderCard = (product) => {
  return (
    <div className="product-card-slider">
      <div className="product-image">
        <img
          src={product?.images[0]?.url}
          alt="product-image"
          className="img-1"
        />
        <img
          src={product?.images[1]?.url}
          alt="product-image"
          className="img-2"
        />
      </div>
      <h3 className="product-title">
        {product.name.length > 25
          ? `${product.name.substring(0, 25)}...`
          : product.name}
      </h3>
      <h4 className="product-price">&#8377;{product.price}</h4>
    </div>
  )
}

export default ProductSliderCard
