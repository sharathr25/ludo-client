import axios from 'axios'

const API_URL = 'http://localhost:5000'

export default payload => axios.post(`${API_URL}/api/create_room`, payload)
