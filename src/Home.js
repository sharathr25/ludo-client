import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { v4 as uuidv4 } from 'uuid'
import createRoomApi from './api/createRoom'
import SocketContext from './SocketContext'

const Home = () => {
  const socket = useContext(SocketContext)
  const [state, _setState] = useState({ name: '', roomId: '' })
  const { name, roomId } = state

  const setState = data => {
    _setState({ ...state, ...data })
  }
  const history = useHistory()

  const handleChange = e => {
    setState({ [e.target.name]: e.target.value })
  }

  const joinRoom = async () => {
    try {
      const id = uuidv4()
      await socket.joinChannel(`room:${roomId}`)
      sessionStorage.setItem('ROOM_ID', roomId)
      sessionStorage.setItem('MY_ID', id)
      history.push(`/room/${state.roomId}`)
      socket.send('JOIN_GAME', { name, id })
    } catch (error) {
      console.log(error)
    }
  }

  const createRoom = async () => {
    try {
      const id = uuidv4()
      const { data: roomId } = await createRoomApi({ name, id })
      await socket.joinChannel(`room:${roomId}`)
      sessionStorage.setItem('ROOM_ID', roomId)
      sessionStorage.setItem('MY_ID', id)
      history.push(`/room/${roomId}`)
      socket.send('JOIN_GAME', { name, id })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <input
        type='text'
        onChange={handleChange}
        name='name'
        placeholder='NAME'
      />
      <input
        name='roomId'
        type='text'
        onChange={handleChange}
        placeholder='ROOM ID'
      />
      <button onClick={joinRoom} disabled={name === '' || roomId === ''}>
        JOIN
      </button>
      <button onClick={createRoom} disabled={name === '' && roomId === ''}>
        CREATE
      </button>
    </div>
  )
}

export default Home
