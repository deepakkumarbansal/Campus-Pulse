import { useDispatch } from 'react-redux'
import { authService } from '../../appwrite/auth.Service'
import { login, logout } from '../../store/authSlice';
import LoadingBar from 'react-top-loading-bar'
import { databaseService } from '../../appwrite/database.Service'
import { setPosts } from '../../store/postsSlice';
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import {Container} from '../index'

const Layout = () => {

    const dispatch = useDispatch();
    const loaderRef = useRef();
    const location = useLocation();

    useEffect(() => {
        loaderRef.current?.continuousStart();
        authService
            .getCurrentUser()
            .then((userData) => {
                dispatch(login(userData));
            })
            .catch((error) => dispatch(logout()))
        databaseService
            .getPosts()
            .then((posts) => {
                dispatch(setPosts(posts.documents))
            })
            .catch((error) => setPosts([]))
            .finally(() => loaderRef.current?.complete());
    }, [location.pathname])

    return (
        <>
            <LoadingBar ref={loaderRef} />
            <Container className='min-h-screen w-screen px-0'>
                <Outlet/>
            </Container>
        </>
    )
}

export default Layout
