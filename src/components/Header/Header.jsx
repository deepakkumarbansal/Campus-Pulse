import React, { useState } from 'react'
import { Container, Logo, Logout } from '../index'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { IoClose } from "react-icons/io5";
import { styled } from 'styled-components'
import { authService } from '../../appwrite/auth.Service';

const Header = () => {
    const [open, setOpen] = useState(false)
    const userData = useSelector(state => state.auth);
    const authStatus = userData.isLogin;
    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true,
        },
        {
            name: 'Create Post',
            slug: '/addPost',
            active: authStatus
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus
        },
        {
            name: 'Create Account',
            slug: '/signup',
            active: !authStatus
        }
    ]

    function logoutEveryWhere(){
        authService
        .logoutFromAllDevices()
        .then(()=>{
            navigate('/login')
        })
        .catch((error)=>{throw error})
    }
    return (
        <Container className="h-16 bg-gray-800 text-white flex items-center">
            <nav className='flex justify-between items-center w-full pl-8'>
                <Link to={'/'}><Logo /></Link>
                <div className='flex justify-end w-1/2 items-center gap-8 mr-24'>
                    {
                        navItems.map(item => (
                            item.active && <Link to={item.slug} key={item.name}>{item.name}</Link>
                        ))
                    }
                    {authStatus && <Logout />}
                    {authStatus && <img src={userData.userData.avatarUrl} alt='us' onError={(e)=>e.target.src="/images/userAvatar.jpg"} onClick={() => setOpen(true)} className={`absolute right-8 w-12 h-12 rounded-full border-2 border-white`}/>}
                </div>
            </nav>
            <Sidebar className={`${open ? 'open' : ''} bg-gray-800`}>
                <StyledClose className={`${open ? 'open' : ''} h-16 `}>
                    <IoClose onClick={() => { setOpen(false) }} className='text-3xl font-extrabold' />
                </StyledClose>
                <div className='flex flex-col gap-4 cursor-pointer'>
                    <div onClick={()=>navigate('myPosts')}>My posts</div>
                    <div onClick={()=>navigate('setting')}>Setting</div>
                    <div onClick={logoutEveryWhere}>Logout from all devices</div>
                </div>
            </Sidebar>
        </Container>
    )
}

const Sidebar = styled.aside`
    top: 0;
    right: -200px;
    width: 200px;
    height: 100vh;
    z-index: 22;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: right .5s ease-in;
    &.open{
        right: 0px;
    }
`
const StyledClose = styled.div`
    position: absolute;
    right: 3.8rem;
    top: 0px;
    transition: transform 0.5s ease-in;
    &.open {
        transform: rotate(90deg);
    }
`;
export default Header
