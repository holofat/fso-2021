import blogService from '../services/blogs'
import React, { useState } from 'react'

const Blog = ({blog, user}) => {
  const [visible, setVisible] = useState(false)
  const [countLike, setCountLike] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = async (e) => {
    e.preventDefault()
    const blogObject = {
      title: blog.title,
      url: blog.url,
      author: blog.author,
      user:blog.user,
      id:blog.id
    }
    try {
      await blogService.addLike(blogObject)
      setCountLike(countLike+1)
    } catch (e) {
      console.log(e)
    }

  }
  
  const handleDelete = async () => {
    if(window.confirm(`Do you want to remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(blog.id, blog.user)
      console.log('a blog is deleted')
    }
  }

  const deleteButton = () => {
    return (
      <div>
        <button onClick={handleDelete}>delete</button>
      </div>
    )
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle} className='blog'>
      <b>{blog.title}</b> {blog.author} 
      <button className="likeButton" type="button" onClick={addLike}>Like Button</button>
      <button style={hideWhenVisible} onClick={toggleVisibility}>view</button>
      <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
      <div className="togglableContent" style={showWhenVisible}>
        <p className="totalLikes">Likes: {countLike}</p>
        {blog.url}<br/>
        {blog.user}<br/>
        {blog.user === user && deleteButton()}
      </div>
    </div>
  )
}

export default Blog