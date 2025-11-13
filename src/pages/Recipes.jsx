import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { FaHome } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router';
import { readRecipes } from '../myBackend';
import { RecipeCard } from '../components/RecipeCard';
import { Header } from '../components/Header';
import { MoonLoader } from 'react-spinners';

export const Recipes = () => {
  const [recipes,setRecipes] = useState([])
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  

  useEffect(()=>{
    setLoading(true)
    readRecipes(setRecipes,setLoading)
  },[])
  console.log(recipes);
  
  return (
    <div style={{minHeight:"100vh",backgroundColor:"lightyellow",position:"relative",paddingTop:"30px"}}>
      <div className='cardContainer' style={{textAlign:"center",paddingTop:"50px"}}>
        {loading? <MoonLoader /> : ""}
        {recipes&&recipes.length>0 && recipes.map(obj=><RecipeCard key={obj.id} {...obj}/>)}
        {recipes&&recipes.length==0 && <h4>Nincsennek receptek</h4>}
      </div>
      <Header/>
      <button onClick={()=>navigate("/addNew")} style={{position:"absolute",bottom:"5px",right:"5px",cursor:"pointer"}} >Új recept hozzáadása</button>
    </div>
  )
}
