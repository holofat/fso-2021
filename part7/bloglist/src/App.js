import React, { useState, useEffect } from 'react'
import ListBlog from './components/ListBlog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

import loginService from './services/login'
import './App.css'

import {showNotification} from './reducers/notificationReducer'
import { initializeBlogs} from './reducers/blogReducer'
import { login } from './reducers/userReducer'

import { useDispatch } from 'react-redux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])
  

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedUser) {
      const userJson = JSON.parse(loggedUser)
      setUser(userJson)
      dispatch(login(userJson))
    }
  }, [])
 
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      dispatch(showNotification(`Hello, ${user.username}`, false))
      dispatch(login(user))
      setUser(user)
      event.target.reset()
    } catch (exception) {
      dispatch(showNotification('Wrong username or password', true))
    }
  }



  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }



  const loginForm = () => (
    <div>
      <h1>Log in to Blog</h1>
      <Notification/>
      <LoginForm  password={password} handleUsername={({target}) => setUsername(target.value)} handlePassword={({target}) => setPassword(target.value)} handleLogin={handleLogin} />
    </div>
  )
  

  const blog = () => {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification/>
        <p>
          {user.username} logged in <button id="#logout-button" type="submit" onClick={() => handleLogout()} value="logout">logout</button>
        </p>
        <Togglable buttonLabel='Create A New Blog'>
          <BlogForm />
        </Togglable>
        <ListBlog/>
      </div>
    )
  }

  return (
    <div>
      
      {user === null && loginForm()}
      {user !== null && blog()}

    </div>
  )
}

export default App