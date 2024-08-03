import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import {store} from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login, Post, PostForm, Signup, EditPost, FilterPosts, Layout, Setting, Logout } from './components/index.js'
import AuthLayout from './components/AuthLayout/AuthLayout.jsx'

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <App/>,
        children: [
          {
            path: '/',
            element: <AuthLayout authentication={true}><FilterPosts/></AuthLayout>
          },
          {
            path: 'addPost',
            element: <AuthLayout authentication={true}><PostForm/></AuthLayout>
          },
          {
            path: 'post/:url',
            element: <AuthLayout authentication><Post/></AuthLayout>
          },
          {
            path: 'editPost/:slug',
            element: <AuthLayout authentication><EditPost/></AuthLayout>
          },
          {
            path: 'myPosts',
            element: <AuthLayout authentication><FilterPosts user = {true}/></AuthLayout>
          },
        ]
      },
      {
        path: '/setting',
        element: <AuthLayout authentication><Setting/></AuthLayout>
      },
      {
        path: '/login',
        element: <AuthLayout><Login/></AuthLayout>
      },
      {
        path: '/signup',
        element: <AuthLayout><Signup/></AuthLayout>,
        loader: () =>{
          return null
        }
      },
      {
        path: '/logout',
        element: <Logout/>
      }
    ]
  },
  {
    path: '*',
    element: <p>Page not exist</p>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>,
)
