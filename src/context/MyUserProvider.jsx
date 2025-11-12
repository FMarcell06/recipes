import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { auth } from '../firebaseApp'

export const MyUserContext = createContext()

export const MyUserProvider = ({children}) => {
  const [user,setUser] = useState(null)
  const [msg,setMsg] = useState({})

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
      await updateProfile(auth.currentUser,{displayName})
      await sendEmailVerification(auth.currentUser)
      console.log("visszaigazolo email elkuldve");
      
      console.log("sikerers regisztracio");
    setMsg({signUp:"Kattints az email címben küldött linkre!"})
    setMsg(prev=>delete prev.err)
      logoutUser()
    } catch (error) {
      console.log(error);
      setMsg({err:error.message})
      
    }
    
  }

  const logoutUser = async ()=>{
    await signOut(auth)
    setMsg(prev=>delete prev.signIn)

  }

  const signInUser = async (email,password)=>{
      try {
        await signInWithEmailAndPassword(auth,email,password)
        const currentUser = auth.currentUser
        if(!currentUser.emailVerified){
          setMsg({err:"Kérlek kattints a az aktiváló linkre!"})
          setMsg(prev=>delete prev.signIn)
          logoutUser()
          return
        }
        console.log("Sikeres bejelentkezes");
        setMsg(prev=>delete prev.err)
        setMsg({signIn:true})
      } catch (error) {
        console.log(error);
        setMsg({err:error.message})
      }
  }

  return (
    <MyUserContext.Provider value={{user,signUpUser,logoutUser,signInUser,msg}}>
      {children}
    </MyUserContext.Provider>
  )
}
