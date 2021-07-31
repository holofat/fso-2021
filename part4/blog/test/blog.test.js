const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/list_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let i = 0; i < helper.initialBlog.length; i++) {
    const blogObject = new Blog(helper.initialBlog[i])
    await blogObject.save()
  }
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

describe('addition of a new note', () => {
  test('a blog is succesfully created', async () => {
    const blogObject = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'nothing',
      likes: 4
    }

    await api
      .post('/api/blogs')
      .send(blogObject)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlog.length + 1)
  })

  test('blogs without likes property, will be given default value of 0', async () => {
    const blogObject = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'nothing'
    }

    await api
      .post('/api/blogs')
      .send(blogObject)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs without title and url, will result 400 Bad Request', async () => {
    const blogObject = {
      author: 'tese'
    }

    await api
      .post('/api/blogs')
      .send(blogObject)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('success with status 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDB()

    expect(blogsAtEnd).toHaveLength(helper.initialBlog.length - 1)

    const contents = blogsAtEnd.map(blog => blog.id)

    expect(contents).not.toContain(blogToDelete.id)
  })
})

describe('updating a blog', () => {
  test('success with status 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToUpdate = blogsAtStart[0]
    const updateLikes = {
      likes: 123
    }
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updateLikes)
      .expect(200)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
