import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes/'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const object = { content, votes: 0}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async (anecdote) => {
  const response = await axios.put(`${baseUrl}${anecdote.id}`, anecdote)
  console.log(response.data)
  return response.data
}

const server = {
  getAll,
  create,
  vote
}

export default server