import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import StartGame from './StartGame'
import RollDice from './RollDice'
import { COLORS } from '../styles/colors'
import { SEAT_COLORS } from '../constants/colors'
import px2vw from '../utils/px2vw'

const PlayerActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: ${px2vw(30)};
  div {
    flex: 0 1 50%;
  }
`

const Text = styled.div`
  color: ${COLORS.WHITE};
`

const PlayerSeatNumber = styled.span`
  color: ${props => SEAT_COLORS[props.children]};
  margin: ${px2vw(2)};
`

const PlayerActions = () => {
  const game = useSelector(state => state.game)
  const { players = [], gameStatus, hostId, currentPlayerSeat, roomId } = game
  const myId = sessionStorage.getItem('MY_ID')
  const myPlayer = players.find(p => p.id === myId)
  const isHost = myPlayer?.id === hostId
  const isInTurn = myPlayer?.seat === currentPlayerSeat

  return (
    <PlayerActionsWrapper>
      {isHost && <StartGame />}
      {gameStatus == 'ON_GOING' && isInTurn && <RollDice isInTurn={isInTurn} />}
      {gameStatus == 'ON_GOING' && !isInTurn && (
        <Text>
          Player
          <PlayerSeatNumber>{currentPlayerSeat}</PlayerSeatNumber>
          turn
        </Text>
      )}
    </PlayerActionsWrapper>
  )
}

export default PlayerActions
