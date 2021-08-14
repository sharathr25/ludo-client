import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { SEAT_COLORS } from '../constants/colors'
import { DESKTOP_BREAKPOINT } from '../styles/breakpoints'
import { COLORS } from '../styles/colors'
import px2vw from '../utils/px2vw'
import RollDice from './RollDice'
import StartGame from './StartGame'

const BASE_SIZE = 150
const PLAYER_CIRCLE_SIZE = px2vw(BASE_SIZE)
const PLAYER_LETTER_SIZE = px2vw(BASE_SIZE / 2)

const PlayerStyledDiv = styled.div`
  width: ${PLAYER_CIRCLE_SIZE};
  height: ${PLAYER_CIRCLE_SIZE};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${px2vw(20)};
  padding: ${px2vw(10)};
  font-size: ${PLAYER_LETTER_SIZE};
  text-transform: uppercase;
  border: 5px solid ${props => SEAT_COLORS[props.seat] || 'black'};
  color: ${props => (props.active ? COLORS.WHITE : SEAT_COLORS[props.seat])};
  border-radius: 50%;
  background-color: ${props =>
    props.active ? SEAT_COLORS[props.seat] : COLORS.TRANSPARENT};
  font-weight: bold;
  white-space: nowrap;
`

const PlayerAndActions = styled.div`
  display: flex;
  flex-direction: ${props =>
    props.seat === 2 || props.seat === 3 ? 'row-reverse' : 'row'};
  align-items: center;
  @media only screen and (min-width: ${DESKTOP_BREAKPOINT}px) {
    flex-direction: ${props =>
      props.seat === 4 || props.seat === 3 ? 'column-reverse' : 'column'};
  }
`

const findBySeat = seat => p => p.seat === seat

const Player = props => {
  const { seat } = props
  const { currentPlayerSeat, players = [], hostId, gameStatus } = useSelector(
    state => state.game
  )
  const player = players.find(findBySeat(seat))
  const isHost = player?.id === hostId
  const isInTurn = player?.seat === currentPlayerSeat
  return (
    <PlayerAndActions {...props}>
      <PlayerStyledDiv active={isInTurn} seat={player && seat}>
        {player?.name.substr(0, 1)}
      </PlayerStyledDiv>
      {isHost && <StartGame />}
      {gameStatus == 'ON_GOING' && isInTurn && <RollDice isInTurn={isInTurn} />}
    </PlayerAndActions>
  )
}

export default Player
