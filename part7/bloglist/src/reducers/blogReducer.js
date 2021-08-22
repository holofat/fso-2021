import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type){
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.data.id)
    case 'ADD_LIKE':
      return state
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blog, token) => {
  return async dispatch => {
    await blogService.create(blog, token)
    dispatch({
      type: 'NEW_BLOG',
      data: blog
    })
    dispatch(initializeBlogs())
  }
}

export const addLike = (blog) => {
  return async dispatch => {
    await blogService.addLike(blog)
    dispatch({
      type:'ADD_LIKE'
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    const id = blog.id
    await blogService.deleteBlog(id, blog.user)
    dispatch({
      type: 'DELETE_BLOG',
      data: {id}
    })
  }
}

export default reducer