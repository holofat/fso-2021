import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newToken, setNewToken] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    ) 
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      setNewToken(user.token)
    }
  }, [])

  const blogsSortByLikes = _.sortBy(blogs, "likes").reverse()
 
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      setNewToken(user.token)
      setMessage(`Hello, ${user.username}`)
      setTimeout(() => {
        setMessage(null)
      }, 2000)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError(true)
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 2000)
      console.log('Wrong Credentials')
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    console.log()
    try {
      await blogService.create(newBlog, newToken)
      setBlogs(blogs.concat(newBlog))
      setMessage(`${newBlog.title} by ${newBlog.author} is added`)
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    setNewToken(null)
  }

  const loginForm = () => (
    <div>
      <h1>Log in to Blog</h1>
      <Notification message={message} error={error}/>
      <LoginForm  password={password} handleUsername={({target}) => setUsername(target.value)} handlePassword={({target}) => setPassword(target.value)} handleLogin={handleLogin} />
    </div>
  )
  

  const blog = () => {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={message} error={error}/>
        <p>
          {user.username} logged in <button type="submit" onClick={() => handleLogout()} value="logout">logout</button>
        </p>
        <Togglable buttonLabel='Create A New Blog'>
          <BlogForm 
            title={newTitle} author={newAuthor} url={newUrl} 
            handleAuthor={({target}) => setNewAuthor(target.value)}
            handleTitle={({target}) => setNewTitle(target.value)}
            handleURL={({target}) => setNewUrl(target.value)}
            handleCreateBlog={handleCreate}
          />
        </Togglable>
        {blogsSortByLikes.map((blog, id) => (
          <Blog key={id} blog={blog} user={user.id}/>
        ))}
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