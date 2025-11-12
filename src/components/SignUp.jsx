
import React from 'react'
import { useContext } from 'react';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { MyUserContext } from '../context/MyUserProvider';
import { useEffect } from 'react';

export const SignUp = () => {
    const navigate = useNavigate()

    const {signUpUser,msg} = useContext(MyUserContext)

    const handleSubmit = (event) => {
        event.preventDefault()
        const data=new FormData(event.currentTarget)
        console.log(data.get('email'),data.get('displayName'),data.get('password'));

        signUpUser(data.get('email'),data.get('displayName'),data.get('password'))
        event.currentTarget.reset()
    }
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Signup</h2>

        <form onSubmit={handleSubmit} className="signup-form">
          
          <label>Email</label>
          <input
          name='email'
            type="email"
            placeholder='email'
            required
          />

          <label>Username</label>
          <input
          name='displayName'
            type="text"
            placeholder='username'
            required
          />

          <label>Password</label>
          <input
          name='password'
            type="password"
            placeholder='password'
            required
          />

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
      </div>
        {(msg && msg?.err||msg?.signUp) && <p style={{color:"red"}}>{msg.err || msg?.signUp}</p>}
    </div>
  );
}