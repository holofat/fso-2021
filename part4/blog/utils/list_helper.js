/* eslint-disable array-callback-return */
const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((s, p) => s + p.likes, 0)
}

const favoriteBlog = (blogs) => {
  const sortable = Object.keys(blogs).sort((a, b) => blogs[a].likes - blogs[b].likes)
  const mostLikes = sortable[blogs.length - 1]

  const blog = {
    title: blogs[mostLikes].title,
    author: blogs[mostLikes].author,
    likes: blogs[mostLikes].likes
  }

  return blog
}

const mostBlog = (blogs) => {
  const countByAuthor = _.countBy(blogs, 'author')

  let newBlogs = []

  for (const [key, value] of Object.entries(countByAuthor)) {
    const newObj = {
      author: key,
      blogs: value
    }

    newBlogs = newBlogs.concat(newObj)
  }

  return _.maxBy(newBlogs, 'blogs')
}

const mostLikes = (blogs) => {
  const groupByAuthor = _.groupBy(blogs, 'author')

  let newBlogs = []

  Object.keys(groupByAuthor).map((author) => {
    const totalLike = groupByAuthor[author].reduce((current, next) => {
      return current + next.likes
    }, 0)

    const newObj = {
      author: author,
      likes: totalLike
    }

    newBlogs = newBlogs.concat(newObj)
  })

  return _.maxBy(newBlogs, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
  mostLikes
}
