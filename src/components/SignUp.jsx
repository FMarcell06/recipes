
import React from 'react'
import { useContext } from 'react';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { MyUserContext } from '../context/MyUserProvider';
import { useEffect } from 'react';
import { MyToasty } from './MyToasty';
import { useState } from 'react';
import { MoonLoader } from 'react-spinners';

export const SignUp = () => {
    const navigate = useNavigate()
    
    const [loading,setLoading] = useState(false)
    const {signUpUser,msg} = useContext(MyUserContext)
    console.log(msg);
    
    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault()
        try {
                 event.preventDefault()
        const data=new FormData(event.currentTarget)
        console.log(data.get('email'),data.get('displayName'),data.get('password'));

        await signUpUser(data.get('email'),data.get('displayName'),data.get('password')) 
        } catch (error) {
          console.log(error); 
        }finally{
          setLoading(false)
        }

    }

    console.log(msg);
    
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

          <button type="submit" disabled={loading} className="signup-btn">
            {loading ? <MoonLoader /> :"Sign Up"}
          </button>
        </form>
      </div>
        {msg && <MyToasty {...msg} /> }
    </div>
  );
}