import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createUser = async (newUser) => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

const updateUser = async (id, gameInfo) => {
  // set up jwt token for authorization
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, gameInfo, config)
  return response.data
}

export default { getUsers, createUser, updateUser, setToken }
