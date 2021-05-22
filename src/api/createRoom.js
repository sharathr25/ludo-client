import axios from 'axios'

export default payload =>
  axios.post('http://localhost:4000/api/create_room', payload)
