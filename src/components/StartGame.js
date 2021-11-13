import React, { useContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { get } from 'idb-keyval'

import SocketContext from '../SocketContext'
import Button from './Button'
import { GAME_EVENTS } from '../constants/gameEvents'

const { START_GAME } = GAME_EVENTS

const StartGame = () => {
  const [myId, setMyId] = useState(null)
  const socket = useContext(SocketContext)
  const game = useSelector(state => state.game)

  useEffect(() => {
    get('MY_ID').then(setMyId)
  }, [])

  const startGame = () => {
    socket.send(START_GAME)
  }

  const { players = [], hostId, gameStatus } = game

  return (
    players.find(p => p.id === myId)?.id === hostId &&
    gameStatus == 'CREATED' && <Button onClick={startGame}>Start Game</Button>
  )
}

export default StartGame
