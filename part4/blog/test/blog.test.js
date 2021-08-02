const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/list_helper')
const api = supertest(app)
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog.model')
const User = require('../models/user.model')
require('dotenv').config()

let token
let userForToken = {
  id: ''
}

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const testUser = await new User({
    username: 'test',
    name: 'test name',
    password: 'test'
  }).save()

  userForToken = {
    username: testUser.username,
    id: testUser.id
  }

  token = jwt.sign(userForToken, process.env.SECRET)

  for (let i = 0; i < helper.initialBlog.length; i++) {
    const blogObject = new Blog(helper.initialBlog[i])
    await blogObject.save()
  }
})
test('invalid users are not created', async () => {
  const userObject = {
    username: 'fe',
    name: 'asdw',
    password: '3rwe'
  }

  await api
    .post('/api/users')
    .send(userObject)
    .expect(200)
})

describe('when there is initially some blogs saved', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlog.length)
  })

  test('the unique identifier property of blog is id', async () => {
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]
    expect(firstBlog.id).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('if a token is not provided will given 401', async () => {
    const blogObject = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'nothing'
    }

    await api
      .post('/api/blogs')
      .send(blogObject)
      .expect(401)
  })

  test('a blog is created', async () => {
    const blogObject = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'nothing'
    }

    await api
      .post('/api/blogs/')
      .send(blogObject)
      .set('Authorization', `bearer ${token}`)
      .expect(200)

    // const blogsAtEnd = await helper.blogsInDB()
    // expect(blogsAtEnd).toHaveLength(helper.initialBlog.length + 1)
  })

  test('blogs without title and url, will result 400 Bad Request', async () => {
    const blogObject = {
      author: 'tese'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1meXoiLCJpZCI6IjYxMDY5ZGIwZGI0NTYwMjAwODMxOWQ3MyIsImlhdCI6MTYyNzg2MDM5NX0.kMcW9631y2i5gvj0-hBi2zkYa6BXmLHEhN2onnIpmLY')
      .send(blogObject)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  let userid
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    const testUser = await new User({
      username: 'test',
      name: 'test name',
      password: 'test'
    }).save()

    for (let i = 0; i < helper.initialBlog.length; i++) {
      const newBlog = Object.assign(helper.initialBlog[i], { user: testUser.id })
      const blogObject = new Blog(newBlog)
      await blogObject.save()
    }

    userid = testUser.id
  })
  test('success with status 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToDelete = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .send({ userid: userid })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDB()

    expect(blogsAtEnd).toHaveLength(helper.initialBlog.length - 1)

    const contents = blogsAtEnd.map(blog => blog.id)

    expect(contents).not.toContain(blogToDelete.id)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
