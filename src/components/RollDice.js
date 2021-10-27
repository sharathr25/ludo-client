import React, { useContext } from 'react'
import { useSelector } from 'react-redux'

import SocketContext from '../SocketContext'
import { GAME_EVENTS } from '../constants/gameEvents'
import Dice3D from './Dice3D'
import styled from 'styled-components'

const { ROLL_DICE, ROLL_DICE_NOTIFY } = GAME_EVENTS

const Wrapper = styled.div`
  cursor: ${props => (props.canTakeAction ? 'pointer' : 'default')};
`

const RollDice = () => {
  const myId = sessionStorage.getItem('MY_ID')
  const socket = useContext(SocketContext)
  const game = useSelector(state => state.game)
  const { score, actionToTake, players = [], currentPlayerSeat } = game
  const myPlayerSeat = players.find(p => p.id === myId)?.seat
  const canTakeAction =
    myPlayerSeat === currentPlayerSeat && actionToTake === 'ROLL_DICE'

  const rollDice = () => {
    if (canTakeAction) {
      socket.send(ROLL_DICE, { playerId: myId })
    }
  }

  return (
    <Wrapper onClick={rollDice} canTakeAction={canTakeAction}>
      <Dice3D score={score} onClick={() => {}} />
    </Wrapper>
  )
}

export default RollDice
