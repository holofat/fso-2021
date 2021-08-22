import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'


const BlogForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
      user: user.id,
      likes:0
    }

    try {
      dispatch(createBlog(newBlog, user.token))
      dispatch(showNotification(`${title} by ${author} is added`, false))
      event.target.reset()
    } catch (exception) {
      console.log(exception)
    }
  }
  return (
    <div className="formDiv">
    <h3>Create New Blog</h3>
    <form onSubmit={handleCreate}>
      Title: <input id="title" type="text" name={title} onChange={({target}) => setTitle(target.value)}/><br/>
      Author: <input id="author" type="text" name={author} onChange={({target}) => setAuthor(target.value)}/><br/>
      URL: <input id="url" type="text" name={url} onChange={({target}) => setUrl(target.value)} /><br/>
      <button id="create-blog" type="submit">create</button>
    </form>
  </div>
  )
}

export default BlogForm