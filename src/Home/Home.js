import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { set } from 'idb-keyval'

import createRoomApi from '../api/createRoom'
import SocketContext from '../SocketContext'
import { DummyPlayerYard, DummyPlayerYards } from './styledComponents'
import Input from '../components/Input'
import Button from '../components/Button'
import LudoHero from '../components/LudoHeading'
import { SEAT_COLORS } from '../constants/colors'
import FullScreenLoader from '../components/FullScreenLoader'

const Home = () => {
  const socket = useContext(SocketContext)
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [state, _setState] = useState({
    nameForCreate: '',
    nameForJoin: '',
    roomId: ''
  })
  const { nameForCreate, roomId, nameForJoin } = state

  const setState = data => {
    _setState({ ...state, ...data })
  }

  const handleChange = e => {
    setState({ [e.target.name]: e.target.value })
  }

  const joinRoom = async () => {
    try {
      setLoading(true)
      const id = uuidv4()
      socket.connect({ playerId: id })
      await socket.joinChannel(`room:${roomId}`)
      set('ROOM_ID', roomId)
      set('MY_ID', id)
      history.push(`/room/${state.roomId}`)
      socket.send('JOIN_GAME', { name: nameForJoin, id })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const createRoom = async () => {
    try {
      setLoading(true)
      const id = uuidv4()
      const { data: roomId } = await createRoomApi({ name: nameForCreate, id })
      socket.connect({ playerId: id })
      await socket.joinChannel(`room:${roomId}`)
      set('ROOM_ID', roomId)
      set('MY_ID', id)
      history.push(`/room/${roomId}`)
      socket.send('JOIN_GAME', { name: nameForCreate, id })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <FullScreenLoader />

  return (
    <DummyPlayerYards>
      <DummyPlayerYard backgroundColor={SEAT_COLORS[1]}>
        <LudoHero />
      </DummyPlayerYard>
      <DummyPlayerYard backgroundColor={SEAT_COLORS[2]} />
      <DummyPlayerYard backgroundColor={SEAT_COLORS[4]}>
        <Input
          type='text'
          onChange={handleChange}
          name='nameForCreate'
          placeholder='NAME'
        />
        <Button onClick={createRoom} disabled={!nameForCreate}>
          CREATE
        </Button>
      </DummyPlayerYard>
      <DummyPlayerYard backgroundColor={SEAT_COLORS[3]}>
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
      </DummyPlayerYard>
    </DummyPlayerYards>
  )
}

export default Home
