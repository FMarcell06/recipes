import React from 'react'
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router';

export const SignUp = () => {
    const navigate = useNavigate()
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Signup</h2>

        <form  className="signup-form">
          
          <label>Email</label>
          <input
            type="email"
            placeholder='email'
            required
          />

          <label>Username</label>
          <input
            type="text"
            placeholder='username'
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder='password'
            required
          />

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}