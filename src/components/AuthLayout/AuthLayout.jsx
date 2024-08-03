import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';

const AuthLayout = ({ children, authentication = false }) => {
  const isLogin = useSelector(state => state.auth.isLogin);
  const navigate = useNavigate();
  const location = useLocation();
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    setLoader(true);
    if (authentication && authentication !== isLogin) {
      navigate('/login');
    } else if(!authentication && isLogin){
      navigate('/');
    }
    setLoader(false);
  }, [location.pathname, navigate, isLogin]);
  return (
    <>
      {loader ? 'Loading...' : children}
    </>
  )
}

export default AuthLayout
