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
                  <a href="/category/showpieces" className="footer-link">
                    ShowPieces
                  </a>
                </li>
                <li>
                  <a href="/category/bedsheets" className="footer-link">
                    Bedsheets
                  </a>
                </li>
                <li>
                  <a href="/category/crockery" className="footer-link">
                    Dining
                  </a>
                </li>
                <li>
                  <a href={`/category/women's-wear`} className="footer-link">
                    Women's Wear
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>About Us</h4>
              <ul>
                <li>
                  <a href="/about" className="footer-link">
                    About Radiant Collections
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact Us</h4>
              <ul>
                <li>
                  <a
                    href="https://wa.me/+918989161972"
                    target="_blank"
                    className="footer-link"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="/trending" className="footer-link">
                    Trendy Products
                  </a>
                </li>
                <li>
                  <a href="/latest" className="footer-link">
                    Newly Launched Products
                  </a>
                </li>
                <li>
                  <a href="/allproducts" className="footer-link">
                    Explore All Products
                  </a>
                </li>
                <li>
                  <a href="/" className="footer-link">
                    Back to HomePage
                  </a>
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
