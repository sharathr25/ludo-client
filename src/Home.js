import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
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
      await socket.joinChannel(`room:${roomId}`)
      sessionStorage.setItem('ROOM_ID', roomId)
      history.push(`/room/${state.roomId}`)
      socket.send('JOIN_GAME', { name })
    } catch (error) {
      console.log(error)
    }
  }

  const createRoom = async () => {
    try {
      const { data: roomId } = await createRoomApi({ name })
      await socket.joinChannel(`room:${roomId}`)
      sessionStorage.setItem('ROOM_ID', roomId)
      history.push(`/room/${roomId}`)
      socket.send('JOIN_GAME', { name })
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
