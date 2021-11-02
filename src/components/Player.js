import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { SEAT_COLORS } from '../constants/colors'
import { COLORS } from '../styles/colors'
import { flexCentered } from '../styles/flex'

const PlayerStyledDiv = styled.div`
  ${flexCentered}
  width: 10rem;
  height: 10rem;
  margin: 1rem;
  padding: 1rem;
  color: ${props => (props.active ? COLORS.WHITE : SEAT_COLORS[props.seat])};
  font-size: 5rem;
  font-weight: bold;
  text-transform: uppercase;
  white-space: nowrap;
  border: 5px solid ${props => SEAT_COLORS[props.seat] || 'black'};
  border-radius: 50%;
  background-color: ${props =>
    props.active ? SEAT_COLORS[props.seat] : COLORS.TRANSPARENT};
`
const findBySeat = seat => p => p.seat === seat

const Player = props => {
  const { seat } = props
  const { currentPlayerSeat, players = [] } = useSelector(state => state.game)
  const player = players.find(findBySeat(seat))
  const isInTurn = player?.seat === currentPlayerSeat

  return (
    <PlayerStyledDiv active={isInTurn} seat={player && seat}>
      {player?.name.substr(0, 1)}
    </PlayerStyledDiv>
  )
}

export default Player
