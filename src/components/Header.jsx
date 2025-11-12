import React from 'react'
import { useContext } from 'react'
import { FaHome } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import { RxAvatar } from "react-icons/rx";
import { MyUserContext } from '../context/MyUserProvider'

export const Header = () => {
    const {user,logoutUser} = useContext(MyUserContext)
    console.log(user);
    
    const navigate = useNavigate()
  return (
    <div className='header'>
        <FaHome onClick={()=>navigate("/")} className='recipesHome' size={50} style={{position:"absolute",top:"5px",left:"5px"}} />
        {user? 
            <div className='headerBtn-container' style={{position:"absolute",top:"5px",right:"5px"}}>
                <RxAvatar size={50}/>
                <h1>{user.displayName}</h1>
                <button className='headerBtn' onClick={()=>logoutUser()}>Kijelentkezés</button>
            </div>
            :
            <div className='headerBtn-container' style={{position:"absolute",top:"5px",right:"5px"}}>
                <button className='headerBtn' onClick={()=>navigate("/signin")} >Bejelentkezés</button>
                <button className='headerBtn' onClick={()=>navigate("/signup")} >Regisztráció</button>
            </div>
        }
    </div>
  )
}
