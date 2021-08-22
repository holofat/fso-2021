import React, {useState, useEffect} from 'react'
import _ from 'lodash'
import Blog from './Blog'

import { showNotification } from '../reducers/notificationReducer'
import { deleteBlog, initializeBlogs } from '../reducers/blogReducer'

import { useDispatch, useSelector } from 'react-redux'

const ListBlog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.user)
  const handleDelete = async (blog) => {
    if(window.confirm(`Do you want to remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog))
        dispatch(showNotification(`${blog.title} is deleted`, true))
      } catch (e){
        console.log(e)
      }
      
    } else {
      return null
    }
  }
  if(blogs === []){
    return(
      <div>Loading</div>
    )
  }


  return (
    <div>
      {blogs.map((blog, id) => (
          <Blog key={id} blog={blog} user={user.id} handleDelete={() => handleDelete(blog)}/>
        ))}
    </div>
  )
}

export default ListBlog