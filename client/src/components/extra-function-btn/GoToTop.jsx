import React, { useEffect, useState } from 'react'
import './GoToTop.css'
import { FaArrowUp } from 'react-icons/fa'

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  const listenToScroll = () => {
    let heightFromWindow = 1000
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop
    if (winScroll > heightFromWindow) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll)
  }, [])

  const goToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <>
      {isVisible && (
        <div className="btn-wrapper">
          <div className="top-btn" onClick={goToTop}>
            <FaArrowUp className="top-btn--icon" />
          </div>
        </div>
      )}
    </>
  )
}

export default GoToTop
