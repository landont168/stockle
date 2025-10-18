import axios from 'axios'
const baseUrl = '/api/stocks'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getStock = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default {
  getAll,
  getStock,
}
