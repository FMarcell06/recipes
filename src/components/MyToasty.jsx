import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import { MyUserContext } from '../context/MyUserProvider'
import { useNavigate } from 'react-router'

export const MyToasty = ({err,signUp,resetPw}) => {
    const {setMsg,msg} = useContext(MyUserContext);
    console.log(resetPw);
    
    const navigate = useNavigate()
    useEffect(()=>{
        if(err){
            toast.error(err,{position:"top-left"})
            setMsg({})
        }else if(signUp){
            toast.success(signUp,{position:"top-left"})
            setTimeout(() => {
                navigate('/signin')
            }, 2000);
            setMsg({})
        }else if(resetPw){ 
            toast.success(resetPw,{position:"top-left"})
            navigate("/signin")
        }
    },[err,signUp,resetPw])
  return (
    <>
        <ToastContainer />
    </>
  )
}
