import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SocketContext from '../SocketContext'
import Button from './Button'
import { GAME_EVENTS } from '../constants/gameEvents'
import { updateGame } from '../redux/gameSlice'
import useSocketEventHandler from '../hooks/useSocketEventHandler'

const { ROLL_DICE, ROLL_DICE_NOTIFY } = GAME_EVENTS

const RollDice = () => {
  const myId = sessionStorage.getItem('MY_ID')
  const socket = useContext(SocketContext)
  const game = useSelector(state => state.game)
  const dispatch = useDispatch()
  useSocketEventHandler(socket, [
    {
      eventName: ROLL_DICE_NOTIFY,
      cb: res => {
        dispatch(updateGame(res))
      }
    }
  ])

  const rollDice = () => {
    socket.send(ROLL_DICE, { playerId: myId })
  }

  const { players = [], gameStatus, actionToTake, currentPlayerSeat } = game
  const myPlayer = players.find(p => p.id === myId)

  return (
    myPlayer?.seat === currentPlayerSeat &&
    gameStatus == 'ON_GOING' &&
    actionToTake === 'ROLL_DICE' && (
      <Button onClick={rollDice}>Roll Dice</Button>
    )
  )
}

export default RollDice
