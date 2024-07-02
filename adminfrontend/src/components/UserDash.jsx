import React from 'react'
import { useNavigate } from 'react-router-dom'
import useLogout from '../hooks/useLogout'

const UserDash = () => {

  const navigate =useNavigate()
  const logout = useLogout()

  const signout = async ()=>{
    await logout();
    navigate('/')
  }
  return (
    <div>
       <button  onClick={signout}>Sign Out</button>
    </div>
  )
}

export default UserDash