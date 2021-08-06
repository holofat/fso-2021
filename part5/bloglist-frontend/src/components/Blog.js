import blogService from '../services/blogs'
import React, { useState } from 'react'

const Blog = ({blog, handleDelete, user}) => {
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
      id:blog.id,
      likes: countLike+1
    }
    try {
      await blogService.addLike(blogObject)
      setCountLike(countLike+1)
    } catch (e) {
      console.log(e)
    }

  }

  const deleteButton = () => {
    if (blog.user === user){
      return (
        <div>
          <button id="delete-button" type="button" onClick={handleDelete}>delete</button>
        </div>
      )
    } else {
      return(<div></div>)
    }
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
      <p id="title"><b>{blog.title}</b> {blog.author} </p>
      <button id="like-button" className="likeButton" type="button" onClick={addLike}>Like</button>
      <button id="show-detail" style={hideWhenVisible} onClick={toggleVisibility}>view</button>
      <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
      <div className="togglableContent" style={showWhenVisible}>
        <p className="totalLikes">Likes: {countLike}</p>
        {blog.url}<br/>
        Created by {blog.user}<br/>
        {deleteButton()}
      </div>
    </div>
  )
}

export default Blog