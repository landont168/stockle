import axios from 'axios'
import { UserRegister, GameResult, Token } from 'types'
const baseUrl = '/api/users'


let token: Token = null

const setToken = (newToken: Token) => {
  token = `Bearer ${newToken}`
}

const getUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createUser = async (newUser: UserRegister) => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

const updateUser = async (id: string, gameInfo: GameResult) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, gameInfo, config)
  return response.data
}

export default { getUsers, createUser, updateUser, setToken }
