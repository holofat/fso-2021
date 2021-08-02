/* eslint-disable array-callback-return */
const Blog = require('../models/blog.model')
require('dotenv').config()

const initialBlog = [
  {
    title: 'Testing Title',
    url: 'Testing URL',
    author: 'Testing Author'
  },
  {
    title: 'Test 2',
    url: 'URL Test 2',
    author: 'Author Test 2'
  }
]

const userTest = {
  username: 'user testing',
  name: 'testing name',
  password: 'password'
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const authHeader = process.env.AUTH_HEADER

module.exports = {
  blogsInDB,
  initialBlog,
  authHeader,
  userTest
}
