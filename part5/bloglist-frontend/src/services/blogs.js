import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }
  try {
    const response = await axios.post(baseUrl, newBlog, config)
    console.log('a blog is created')
    return response.data
  } catch (exception) {
    console.log(exception)
  }
}



export default { getAll, create }