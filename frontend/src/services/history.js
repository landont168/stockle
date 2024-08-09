import axios from 'axios'
const baseUrl = '/api/history'

const getHistory = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { getHistory }
