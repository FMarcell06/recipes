import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { auth } from '../firebaseApp'
import { useNavigate } from 'react-router'

export const MyUserContext = createContext()

export const MyUserProvider = ({children}) => {
  const [user,setUser] = useState(null)
  const [msg,setMsg] = useState({})

  const navigate = useNavigate()
  useEffect(()=>{
    const unsubsrcibe = onAuthStateChanged(auth,(currentUser)=>{
      setMsg({})
      setUser(currentUser)
    })
    return ()=>unsubsrcibe()
  },[])

  const signUpUser = async (email,displayName,password)=>{
    console.log(email,displayName,password);
    try {
      await createUserWithEmailAndPassword(auth,email,password)
      if(auth.currentUser.emailVerified){await updateProfile(auth.currentUser,{displayName})}
      await sendEmailVerification(auth.currentUser)
      console.log("visszaigazolo email elkuldve");
      
      console.log("sikerers regisztracio");
    setMsg(prev=>({...prev},{signUp:"Kattints az email címben küldött linkre!"}))

    } catch (error) {
      console.log(error);
      setMsg({err:error.message})
      
    }
    
  }

  const logoutUser = async ()=>{
    await signOut(auth)
    
  }

  const signInUser = async (email,password)=>{
      try {
        await signInWithEmailAndPassword(auth,email,password)
        const currentUser = auth.currentUser
        if(!currentUser.emailVerified){
          setMsg({signUp:"Kérlek kattints a az aktiváló linkre!",info:"Kérlek kattints a az aktiváló linkre!"})
          logoutUser()
          return
        }
        console.log("Sikeres bejelentkezes");
        setMsg({signIn:true})
      } catch (error) {
        console.log(error);
        setMsg({err:error.message})
      }
  }

  const resetPassword = async (email)=> {
    let success = false
    try {
      await sendPasswordResetEmail(auth,email)
      setMsg({resetPw:"A jelszó visszaállítási email elküldve!"})
      console.log(msg);
      
      success = true
    } catch (error) {
      setMsg({err:error.message})
    }finally{
      
    }

    console.log(msg);
    
  }

  return (
    <MyUserContext.Provider value={{user,signUpUser,logoutUser,signInUser,msg,setMsg,resetPassword}}>
      {children}
    </MyUserContext.Provider>
  )
}
