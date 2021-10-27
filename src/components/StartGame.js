import React, { useContext } from 'react'
import { useSelector } from 'react-redux'

import SocketContext from '../SocketContext'
import Button from './Button'
import { GAME_EVENTS } from '../constants/gameEvents'

const { START_GAME } = GAME_EVENTS

const StartGame = () => {
  const myId = sessionStorage.getItem('MY_ID')
  const socket = useContext(SocketContext)
  const game = useSelector(state => state.game)

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
