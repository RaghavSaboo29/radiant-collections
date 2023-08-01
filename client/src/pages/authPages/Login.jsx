import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { useAuth } from '../../context/auth'
import Layout from '../../components/layout/Layout'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    //import.meta.env.
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8080/api/v1/auth/login', {
        email,
        password,
      })
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        })
        localStorage.setItem('auth', JSON.stringify(res.data))
        navigate(location.state || '/dashboard')
      } else {
        console.log(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <div className="form-container">
        <h4 className="form-title">LOGIN FORM</h4>
        <form className="form contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-input"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-input"
              autoFocus
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="form-btn btn-block">
            submit
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Login
