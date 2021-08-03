import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const Notification = ({message, error}) => {
  if (message === null){
    return null
  }
  const classNotification = error ? 'error' : 'success'

  return (
    <div className={classNotification}>
      <h3>{message}</h3>
    </div>
  )
}

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
      <h1>log in to application</h1>
      <Notification message={message} error={error}/>
      <form onSubmit={handleLogin}>
        <div>
          username <input text="text" value={username} name="username" onChange={({target}) => setUsername(target.value)}/>
        </div>
        <div>
          password <input type="password" value={password} name="password" onChange={({target}) => setPassword(target.value)}/>
        </div>
        <button type="submit">login</button>
      </form>
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
        <h3>Create New Blog</h3>
        <form onSubmit={handleCreate}>
          Title: <input type="text" name="newTitle" onChange={({ target }) => setNewTitle(target.value)}/><br/>
          Author: <input type="text" name="newAuthor" onChange={({ target }) => setNewAuthor(target.value)}/><br/>
          URL: <input type="text" name="newUrl" onChange={({ target }) => setNewUrl(target.value)} /><br/>
          <button type="submit">create</button>
        </form>
        {blogs.map((blog, id) => (
          <Blog key={id} blog={blog}/>
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