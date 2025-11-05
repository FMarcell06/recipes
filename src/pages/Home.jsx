import React from 'react'
import { useNavigate } from 'react-router'

export const Home = () => {
    const navigate = useNavigate()
  return (
    <div className='home'>
        <h1>RecipeBook</h1>
        <button onClick={()=>navigate("/recipes")}>Főzz, posztolj, inspirájl!</button>
    </div>
  )
}
