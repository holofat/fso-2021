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

  if (!req.token || !req.decodedToken) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  try {
    const user = await User.findById(req.decodedToken.id)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.json(savedBlog.toJSON()).status(200)
  } catch (e) {
    res.status(400).json(e)
  }
})

router.put('/:id', async (req, res) => {
  const body = req.body
  const user = req.user

  const blogObject = {
    title: body.title,
    url: body.url,
    author: body.author
  }

  try {
    const blog = await Blog.findById(req.params.id)
    if (blog.user.toString() === user.toString()) {
      await Blog.findByIdAndUpdate(req.params.id, blogObject)
      console.log('a blog is updated')
      res.status(200).end()
    } else {
      res.json({ error: 'only user who create this blog can update this' })
    }
  } catch (e) {
    res.json(e)
  }
})

router.put('/likes/:id', async (req, res) => {
  const body = req.body
  const user = req.user

  try {
    const blog = await Blog.findById(req.params.id)
    const blogObject = {
      title: body.title,
      url: body.url,
      author: body.author,
      likes: blog.likes + 1,
      user: user
    }
    await Blog.findByIdAndUpdate(req.params.id, blogObject)
    console.log(`a like is given to ${body.title}`)
    res.status(200).end()
  } catch (e) {
    res.json(e)
  }
})

router.delete('/:id', async (req, res) => {
  const user = req.user
  try {
    const blog = await Blog.findById(req.params.id)
    if (blog.user.toString() === user.toString()) {
      await Blog.findByIdAndDelete(req.params.id)
      res.status(200).json('a blog is deleted').end()
    } else {
      res.status(400).json({ error: 'only user who create this blog can delete this' })
    }
  } catch (e) {
    console.log('error')
    res.status(400).json(e)
  }
})

module.exports = router
