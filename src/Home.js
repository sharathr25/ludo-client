import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { v4 as uuidv4 } from 'uuid'

import createRoomApi from './api/createRoom'
import SocketContext from './SocketContext'
import DummyPlayerYards from './Components/DummyPlayerYards'
import DummyPlayerYard from './Components/DummyPlayerYard'
import Input from './Components/Input'
import Button from './Components/Button'
import LudoHero from './Components/LudoHeading'
import { SEAT_COLORS } from './constants/colors'

const Home = () => {
  const socket = useContext(SocketContext)
  const [state, _setState] = useState({
    nameForCreate: '',
    nameForJoin: '',
    roomId: ''
  })
  const { nameForCreate, roomId, nameForJoin } = state

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
      socket.connect({ playerId: id })
      await socket.joinChannel(`room:${roomId}`)
      sessionStorage.setItem('ROOM_ID', roomId)
      sessionStorage.setItem('MY_ID', id)
      history.push(`/room/${state.roomId}`)
      socket.send('JOIN_GAME', { name: nameForJoin, id })
    } catch (error) {
      console.log(error)
    }
  }

  const createRoom = async () => {
    try {
      const id = uuidv4()
      const { data: roomId } = await createRoomApi({ name: nameForCreate, id })
      socket.connect({ playerId: id })
      await socket.joinChannel(`room:${roomId}`)
      sessionStorage.setItem('ROOM_ID', roomId)
      sessionStorage.setItem('MY_ID', id)
      history.push(`/room/${roomId}`)
      socket.send('JOIN_GAME', { name: nameForCreate, id })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <DummyPlayerYards>
        <DummyPlayerYard backgroundColor={SEAT_COLORS[1]}>
          <div className='flex-centered'>
            <LudoHero />
          </div>
        </DummyPlayerYard>
        <DummyPlayerYard backgroundColor={SEAT_COLORS[2]} />
        <DummyPlayerYard backgroundColor={SEAT_COLORS[4]}>
          <div className='flex-centered'>
            <Input
              type='text'
              onChange={handleChange}
              name='nameForCreate'
              placeholder='NAME'
            />
            <Button onClick={createRoom} disabled={!nameForCreate}>
              CREATE
            </Button>
          </div>
        </DummyPlayerYard>
        <DummyPlayerYard backgroundColor={SEAT_COLORS[3]}>
          <div className='flex-centered'>
            <Input
              type='text'
              onChange={handleChange}
              name='nameForJoin'
              placeholder='NAME'
            />
            <Input
              name='roomId'
              type='text'
              onChange={handleChange}
              placeholder='ROOM ID'
            />
            <Button onClick={joinRoom} disabled={!nameForJoin || !roomId}>
              JOIN
            </Button>
          </div>
        </DummyPlayerYard>
      </DummyPlayerYards>
    </div>
  )
}

export default Home
