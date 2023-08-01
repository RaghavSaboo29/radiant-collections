import React from 'react'
import Layout from '../../components/layout/Layout'
import '../pages-css/AboutUs.css'
import AboutUsImg from '../../images/about-banner.jpg'
const AboutUs = () => {
  return (
    <Layout title={'About- Radiant Collections & decor'}>
      <div className="about-container">
        <div className="about-heading">
          <h2>
            Discovering Charm: A Journey with Radiant Collections and Decor
          </h2>
        </div>
        <div className="about-grid">
          <div className="about-img">
            <img src={AboutUsImg} alt="" />
          </div>
          <div className="about-details">
            <h4>Welcome to Radiant Collections and Decor</h4>
            <p>
              At <b> Radiant Collections and Decor</b>, we celebrate the rich
              diversity of cultures through our carefully curated collection of
              home decor and ethnic clothing. Our passion for cultural heritage
              and design excellence drives us to offer an enchanting blend of
              decor items and clothing that reflect the soul of different
              traditions, bringing a touch of warmth and elegance to your home
              and wardrobe. <br />
              Embrace the art of home decoration with our thoughtfully selected
              decor collection. We believe that a well-adorned home is a canvas
              that tells the story of its inhabitants. From intricately crafted
              tapestries to handwoven rugs, each piece in our assortment
              embodies the essence of craftsmanship and cultural artistry.
              Create captivating living spaces that harmoniously blend
              contemporary aesthetics with traditional charm. <br />
              Step into a world of vibrant colors and timeless elegance with our
              ethnic clothing boutique. Our diverse range of attire celebrates
              the grace and beauty of various cultures, ensuring you find the
              perfect outfit for every occasion. Whether it's a dazzling saree,
              a stylish kurta, or an exquisite lehenga, our boutique offers an
              array of choices that cater to both classic and modern tastes.{' '}
              <br />
              We take pride in supporting artisans and local communities,
              partnering with skilled craftsmen and designers who pour their
              hearts into creating these masterpieces and that's why we have
              partnered up with more than 25 manufacturers across India. The
              result is an unparalleled collection that showcases the
              craftsmanship and heritage of different regions across the globe.
              As a customer-focused brand, we strive to provide a delightful
              shopping experience. Our team is here to guide you through the
              selection process, helping you find decor items and clothing that
              resonate with your personality and style. We believe that the
              items you choose for your home and wardrobe should not only be
              beautiful but also tell a story that reflects your appreciation
              for culture and art. Thank you for being a part of{' '}
              <b> Radiant Collections and Decor</b> . We hope that our Home
              decor and Ethnic Clothes Collection inspire you to embrace the
              beauty of cultural diversity and fill your life with elegance and
              joy. Happy shopping!
            </p>
          </div>
          <div className="contact-details">
            <h4>Get in Touch With Us</h4>
            <p>
              We value your interest in our exquisite home decor and boutique
              collections and are thrilled to connect with you. Whether you have
              questions, feedback, need assistance, or want to place an order,
              our dedicated team is here to provide you with the support you
              deserve. Please feel free to reach out to us through any of the
              following contact methods:
            </p>
            <br />
            <ul>
              <li>
                <b>Customer Support Email:</b> For general inquiries, product
                information, or assistance with your orders, please drop us an
                email at{' '}
                <b>
                  <i>raghavmighty50@gmail.com</i>
                </b>{' '}
                . We aim to respond to all emails within 24-48 hours.
              </li>
              <li>
                <b>Phone Support:</b> If you prefer to speak with us directly or
                converse with us through WhatsApp, kindly press the WhatsApp
                icon in the bottom right. Our Team aims to respond to all
                messages and queries quickly and efficiently.
              </li>
            </ul>
            <p>
              We cherish every opportunity to assist you in transforming your
              living spaces into cherished havens of style and comfort. Your
              satisfaction is our top priority, and we are committed to ensuring
              your shopping experience with us is delightful. Thank you for
              choosing Home Decor Collections. We look forward to connecting
              with you soon!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutUs
