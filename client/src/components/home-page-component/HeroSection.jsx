import React from 'react'
import './HeroSection.css'
import heroSection from '../../images/hero-section.jpg'
import { Link } from 'react-router-dom'
const HeroSection = () => {
  return (
    <>
      <h3 className="hero-heading">Deep dive into Exquisite Collections</h3>
      <div className="hero-section">
        <div className="hero-section-1">
          <p>
            Transform your living spaces into a haven of elegance and charm with
            our exquisite collection of home decor. Delight in the fusion of
            timeless design and contemporary flair as you embark on a journey
            through our meticulously curated assortment, thoughtfully crafted to
            enhance the ambiance of every room. <br />
            Adorn your walls with masterpieces that inspire and captivate. Our
            collection of wall art showcases a diverse array of styles, from
            abstract modern pieces that evoke emotions to classic paintings that
            tell stories of the past <br />
            Embrace the beauty of cultural diversity with our enchanting ethnic
            clothing line. Celebrate traditions with contemporary flair as you
            explore a wide array of vibrant sarees, elegant kurta sets, and
            regal lehengas. <br />
            In conclusion, our exquisite collection of home decor embodies the
            essence of artistry and sophistication. With attention to detail and
            a keen understanding of design, we present a range of decor pieces
            that elevate your living spaces to new heights. Discover the art of
            living through our exquisite offerings and transform your home into
            a true masterpiece.
          </p>
          <div className="btns">
            {/* <Link to={`/trending`} style={{ textDecoration: 'none' }}>
              <button className="btn btn-outline-dark">View Trending</button>
            </Link> */}
            <Link to={`/latest`} style={{ textDecoration: 'none' }}>
              <button className="btn btn-outline-primary">
                Newly Launched{' '}
              </button>
            </Link>
          </div>
        </div>
        <div className="hero-section-2">
          <img src={heroSection} alt="hero-section" />
        </div>
      </div>
    </>
  )
}

export default HeroSection
