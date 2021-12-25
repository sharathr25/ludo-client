import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { get } from 'idb-keyval'
import StartGame from './StartGame'
import RollDice from './RollDice'
import { COLORS } from '../styles/colors'
import { SEAT_COLORS } from '../constants/colors'
import { px2vw } from '../utils'

const PlayerActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 1rem;
  color: ${COLORS.WHITE};
`

const PlayerSeatNumber = styled.span`
  color: ${props => SEAT_COLORS[props.seat]};
  margin: ${px2vw(2)};
  text-transform: uppercase;
`

const PlayerActions = () => {
  const game = useSelector(state => state.game)
  const { players = [], gameStatus, hostId, currentPlayerSeat } = game
  const [myId, setMyId] = useState(null)
  const myPlayer = players.find(p => p.id === myId)
  const currentPlayer = players.find(p => p.seat === currentPlayerSeat)
  const isHost = myPlayer?.id === hostId
  const isInTurn = myPlayer?.seat === currentPlayerSeat

  useEffect(() => {
    get('MY_ID').then(setMyId)
  }, [])

  return (
    <PlayerActionsWrapper>
      {isHost && <StartGame />}
      {gameStatus == 'ON_GOING' && isInTurn && <h3>Your Turn</h3>}
      {gameStatus == 'ON_GOING' && !isInTurn && (
        <h3>
          <PlayerSeatNumber seat={currentPlayerSeat}>
            {currentPlayer.name}
          </PlayerSeatNumber>
          {`'s Turn`}
        </h3>
      )}
      {gameStatus == 'ON_GOING' && <RollDice />}
    </PlayerActionsWrapper>
  )
}

export default PlayerActions
