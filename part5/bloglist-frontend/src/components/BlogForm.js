import React from 'react'

const BlogForm = ({ title, author, url, handleTitle, handleAuthor, handleURL, handleCreateBlog }) => (
  <div>
    <h3>Create New Blog</h3>
    <form onSubmit={handleCreateBlog}>
      Title: <input type="text" name={title} onChange={handleTitle}/><br/>
      Author: <input type="text" name={author} onChange={handleAuthor}/><br/>
      URL: <input type="text" name={url} onChange={handleURL} /><br/>
      <button type="submit">create</button>
    </form>
  </div>
)

export default BlogForm