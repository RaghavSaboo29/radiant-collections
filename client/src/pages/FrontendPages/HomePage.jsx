import React from 'react'
import HomePageLayout from '../../components/layout/HomePageLayout'
import { useAuth } from '../../context/auth'

const HomePage = () => {
  const [auth, setAuth] = useAuth()
  return (
    <>
      <HomePageLayout />
    </>
  )
}

export default HomePage
