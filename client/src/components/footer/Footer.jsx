import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-container">
          <div className="footer-row">
            <div className="footer-col">
              <h4>Top Categories</h4>
              <ul>
                <li>
                  <Link
                    to="/category/showpieces"
                    style={{ textDecoration: 'none' }}
                    className="footer-link"
                  >
                    ShowPieces
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/bedsheets"
                    style={{ textDecoration: 'none' }}
                    className="footer-link"
                  >
                    Bedsheets
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/crockery"
                    style={{ textDecoration: 'none' }}
                    className="footer-link"
                  >
                    Dining
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/category/women's-wear`}
                    style={{ textDecoration: 'none' }}
                    className="footer-link"
                  >
                    Women's Wear
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>About Us</h4>
              <ul>
                <li>
                  <Link
                    to="/about"
                    style={{ textDecoration: 'none' }}
                    className="footer-link"
                  >
                    About Radiant Collections
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact Us</h4>
              <ul>
                <li>
                  <Link
                    to="https://wa.me/+918989161972"
                    target="_blank"
                    className="footer-link"
                    style={{ textDecoration: 'none' }}
                  >
                    WhatsApp
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <Link
                    to="/trending"
                    style={{ textDecoration: 'none' }}
                    className="footer-link"
                  >
                    Trendy Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/latest"
                    style={{ textDecoration: 'none' }}
                    className="footer-link"
                  >
                    Newly Launched Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/allproducts"
                    style={{ textDecoration: 'none' }}
                    className="footer-link"
                  >
                    Explore All Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    style={{ textDecoration: 'none' }}
                    className="footer-link"
                  >
                    Back to HomePage
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <h3>All Rights Reserved &copy; Radiant Collections </h3>
        </div>
      </div>
    </>
  )
}

export default Footer
