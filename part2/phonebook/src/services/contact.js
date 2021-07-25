import axios from 'axios'
const baseUrl = 'https://phone-book-be.herokuapp.com/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const deleteContact = id => {
  return axios.delete(baseUrl+'/'+id)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const contactService = {getAll, create, deleteContact, update}

export default contactService