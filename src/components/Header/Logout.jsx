import React from 'react'
import {authService} from '../../appwrite/auth.Service'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice';
const Logout = () => {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService
        .logoutFromThisDevice()
        .then(()=>{
            dispatch(logout());
        })
    }
  return (
    <button onClick={logoutHandler}>Logout</button>
  )
}

export default Logout
