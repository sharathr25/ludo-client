import React, { useContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { get } from 'idb-keyval'

import SocketContext from '../SocketContext'
import { GAME_EVENTS } from '../constants/gameEvents'
import Dice3D from './Dice3D'

const { ROLL_DICE } = GAME_EVENTS

const Wrapper = styled.div`
  margin-left: 10px;
  cursor: ${props => (props.canTakeAction ? 'pointer' : 'not-allowed')};
`

const RollDice = () => {
  const [myId, setMyId] = useState(null)
  const socket = useContext(SocketContext)
  const game = useSelector(state => state.game)
  const { score, actionToTake, players = [], currentPlayerSeat } = game
  const myPlayerSeat = players.find(p => p.id === myId)?.seat
  const canTakeAction =
    myPlayerSeat === currentPlayerSeat && actionToTake === 'ROLL_DICE'

  useEffect(() => {
    get('MY_ID').then(setMyId)
  }, [])

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
