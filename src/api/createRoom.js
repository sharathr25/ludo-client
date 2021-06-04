import axios from 'axios'

export default payload =>
  axios.post('http://localhost:5000/api/create_room', payload)
