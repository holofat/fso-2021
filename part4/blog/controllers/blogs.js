const Blog = require('../models/blog.model')
const User = require('../models/user.model')
const router = require('express').Router()

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({})
    res.json(blogs)
  } catch (e) {
    res.json(e)
  }
})

router.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findById(body.userId)

  try {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.json(savedBlog)
  } catch (e) {
    res.status(400).json(e)
  }
})

router.put('/:id', async (req, res) => {
  const body = req.body

  const blogObject = {
    likes: body.likes
  }

  try {
    await Blog.findByIdAndUpdate(req.params.id, blogObject)
    res.status(200).json('Success updating').end()
  } catch (e) {
    res.json(e)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (e) {
    res.json(e)
  }
})

module.exports = router
