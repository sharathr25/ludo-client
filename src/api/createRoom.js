import axios from 'axios'
import { API_URL } from '../config'

export default payload => axios.post(`${API_URL}/api/create_room`, payload)
