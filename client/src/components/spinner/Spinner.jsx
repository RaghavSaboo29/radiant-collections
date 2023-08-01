import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
const Spinner = () => {
  const [count, setCount] = useState(3)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((preValue) => --preValue)
    }, 1000)
    count === 0 && navigate('/')
    return () => clearInterval(interval)
  }, [count, navigate])
  return (
    <h1>
      You are not Authorized. You will be redirected to home page in {count}{' '}
      seconds
    </h1>
  )
}

export default Spinner
