import React from 'react'
import { FaHome } from 'react-icons/fa'
import { useNavigate } from 'react-router'

export const SignIn = () => {
    const navigate = useNavigate()
  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2 className="signin-title">Sign In</h2>

        <form className="signin-form">

          <label>Email</label>
          <input
            type="email"
            placeholder='email'
            required

          />

          <label>Password</label>
          <input
            type="password"
            placeholder='password'
            required
          />

          <button type="submit" className="signin-btn">
            Log In
          </button>
        </form>
      </div>
    </div>

  )
}
