const Blog = require('../models/blog')
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
  const blog = new Blog(req.body)

  try {
    const savedBlog = await blog.save()
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
