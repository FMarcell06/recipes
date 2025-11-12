import React from 'react'
import { FaHome } from 'react-icons/fa'
import { useNavigate } from 'react-router'

export const Header = () => {
    const navigate = useNavigate()
  return (
    <div>
        <FaHome onClick={()=>navigate("/")} className='recipesHome' size={50} style={{position:"absolute",top:"5px",left:"5px"}} />
        <div className='headerBtn-container' style={{position:"absolute",top:"5px",right:"5px"}}>
            <button className='headerBtn' onClick={()=>navigate("/signin")} >Bejelentkezés</button>
            <button className='headerBtn' onClick={()=>navigate("/signup")} >Regisztráció</button>
        </div>
    </div>
  )
}
