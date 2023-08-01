import React from 'react'
import WhatsAppImg from '../../images/whatsapp.png'
import './WhatsAppBtn.css'
const WhatsAppBtn = () => {
  return (
    <>
      <div className="wp-wrapper">
        <a href="https://wa.me/+919007704578" target="_blank">
          <div className="wp-btn">
            <img src={WhatsAppImg} alt="whatsapp-icon" className="wp-img" />
          </div>
        </a>
      </div>
    </>
  )
}

export default WhatsAppBtn
