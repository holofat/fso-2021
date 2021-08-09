import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = () => {
  try {
    const request = axios.get(baseUrl)
    return request.then(result => result.data)
  } catch (e) {
    console.log(e)
  }
}

const create = async (newBlog, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }
  try {
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
  } catch (exception) {
    console.log(exception)
  }
}

const addLike = (blogObject) => {
  try {
    const request = axios.put(baseUrl+'/likes/'+blogObject.id, blogObject)
    return request.data
  } catch (e) {
    console.log(e)
  }
}

const deleteBlog = (id, user) => {
  const data = {
    data: {userid: user}
  }
  try {
    const request = axios.delete(`${baseUrl}/${id}`, data)
    return request.data
  } catch (e) {
    console.log(e)
  }
}


export default { getAll, create, addLike, deleteBlog }