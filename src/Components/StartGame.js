import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import SocketContext from '../SocketContext'
import Button from './Button'
import { GAME_EVENTS } from '../constants/gameEvents'
import { ERROR_MSGS } from '../constants/texts'
import { updateGame } from '../redux/gameSlice'
import useSocketEventListener from '../hooks/useSocketEventListener'

const { START_GAME, START_GAME_NOTIFY, START_GAME_ERROR } = GAME_EVENTS

const StartGame = () => {
  const myId = sessionStorage.getItem('MY_ID')
  const socket = useContext(SocketContext)
  const game = useSelector(state => state.game)
  const dispatch = useDispatch()
  useSocketEventListener(socket, [
    {
      eventName: START_GAME_NOTIFY,
      cb: res => {
        dispatch(updateGame(res))
      }
    },
    {
      eventName: START_GAME_ERROR,
      cb: res => {
        if (ERROR_MSGS[res.reason]) {
          toast.error(ERROR_MSGS[res.reason])
        } else {
          console.error(res)
        }
      }
    }
  ])

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
